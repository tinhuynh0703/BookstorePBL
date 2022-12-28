import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import Review from "./Review";
import Header from "../../components/Header";
import GoBackBtn from "../../components/GoBackBtn";
import { useState, useEffect } from "react";
import { userSelector } from "../../redux/selectors";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const steps = ["Địa chỉ nhận hàng", "Kiểm tra đơn đặt hàng"];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const shippingFee = 15000;
  const username = useSelector(userSelector);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`api/carts/${username}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setCartItems(res.data.data);
          console.log(res.data.data);
        });
    };
    fetchData();
  }, [username]);

  useEffect(() => {
    let subTotal = 0;
    cartItems.forEach((item) => {
      subTotal += item.totalprice;
    });
    setSubtotal(subTotal);
    setTotal(subTotal + shippingFee);
  }, [cartItems]);

  const handlePayment = (e) => {
    e.preventDefault();
    const data = {
      price: subtotal,
      ship: shippingFee,
      discount: 0,
      totalPrice: total,
    };

    Promise.all([
      axios
        .get(`api/paypal?totalPrice=${(data.totalPrice / 23000).toFixed(2)}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.redirectUrl);
          window.location.href = res.data.redirectUrl;
        }),
      axios.post(`api/bills/${username}`, data, {
        headers: {
          token: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    ]).then((res) => {
      console.log(res);
      // setActiveStep(activeStep + 1);
    });

    // axios
    //     .post(`api/bills/${username}`, data, {
    //         headers: {
    //             'token': `Bearer ${localStorage.getItem('token')}`
    //         }
    //     })
    //     .then(res => {
    //         console.log(res);
    //         setActiveStep(activeStep + 1)
    //     })
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <Toolbar>
        <Header />
      </Toolbar>
      <Container component="main" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <GoBackBtn />
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Cảm ơn bạn đã đặt hàng!
              </Typography>
              <Typography variant="subtitle1">
                Mã đơn hàng của bạn là #10506. <br /> Chúng tôi đã gửi email xác
                nhận đơn hàng của bạn. Đội ngũ BookStore xin chân thành cảm ơn
                và chúc bạn một ngày tốt lành!
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "20px",
                }}
              >
                {activeStep !== 0 && (
                  <Button color="warning" onClick={handleBack}>
                    Quay lại
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Box>
                    <Button
                      variant="contained"
                      color="warning"
                      onClick={handleClickOpen}
                    >
                      Đặt hàng
                    </Button>
                    <Dialog
                      open={open}
                      keepMounted
                      onClose={handleClose}
                      aria-describedby="alert-dialog-slide-description"
                    >
                      <DialogTitle>{"Xác nhận đơn hàng"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                          Bạn có chắc chắn muốn đặt hàng?
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button color="error" onClick={handleClose}>
                          Hủy
                        </Button>
                        <Box component="form" onSubmit={handlePayment}>
                          <Button
                            color="error"
                            variant="contained"
                            type="submit"
                          >
                            Đồng ý
                          </Button>
                        </Box>
                      </DialogActions>
                    </Dialog>
                  </Box>
                ) : (
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={handleNext}
                  >
                    Tiếp theo
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </div>
  );
}
