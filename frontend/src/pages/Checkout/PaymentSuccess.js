import { Box, Button, Paper, Typography } from "@mui/material"
import { Container } from "@mui/system"
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from "react"
import { useNavigate } from "react-router-dom";
import Fade from '@mui/material/Fade';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Container maxWidth="lg" sx={{ mt: 10 }}>
                <Paper elevation={3} sx={{ p: 5, display: "flex", justifyContent: "center" }}>
                    <Fade in>
                        <Box width={400} sx={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px" }}>
                            <CreditScoreIcon sx={{ fontSize: 100, color: "green" }} />
                            <Typography variant="h4" sx={{ mt: 2 }}>Thanh toán thành công</Typography>
                            <Typography variant="h6" gutterBottom>
                                Cảm ơn bạn đã đặt hàng!
                            </Typography>
                            <Typography variant="subtitle1">
                                Chúng tôi đã gửi email xác nhận đơn hàng của bạn.
                                Đội ngũ BookStore xin chân thành cảm ơn và chúc bạn một ngày tốt lành!
                            </Typography>
                            <Button sx={{ mt: 3 }} onClick={() => navigate("/")} startIcon={<ArrowBackIcon />}>
                                Trở về trang chủ
                            </Button>
                        </Box>
                    </Fade>
                </Paper>
            </Container>
        </div>
    )
}

export default PaymentSuccess