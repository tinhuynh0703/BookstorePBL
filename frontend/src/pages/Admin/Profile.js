import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { userSelector } from "../../../redux/selectors";
import axios from "axios";
import { Alert, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Container } from "@mui/system";

function Profile() {
    const [data, setData] = useState({});
    const [birthname, setBirthName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [success, setSuccess] = useState('');
    const username = useSelector(userSelector);

    useEffect(() => {
        const fetchData = () => {
            axios.create({
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .get(`api/users/${username}`)
                .then(res => {
                    setData(res.data);
                    setBirthName(res.data.user[0].birthname);
                    setPhoneNumber(res.data.user[0].phonenumber);
                    setAddress(res.data.user[0].address);
                })
        }
        fetchData();
    }, [username]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            birthname,
            phonenumber,
            address
        }
        axios
            .patch(`api/users/${username}`, data, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            }
            )
            .then(res => {
                console.log(res.data)
                setSuccess(res.data.message)
            })
    }

    return (
        <div>
            <Container sx={{ p: 2 }} >
                {data.user && (
                    <Box>
                        <Typography variant="h6" gutterBottom>
                            Hồ Sơ Của Tôi
                        </Typography>
                        <Typography marginBottom="20px" variant="body2" component="div" gutterBottom>
                            Quản lý thông tin tài khoản cá nhân
                        </Typography>
                        <Divider />
                        <Grid container spacing={1}>
                            <Grid item xs={2} >
                                <Box marginTop="20px" >
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        Tên đăng nhập
                                    </Typography>
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        Họ và tên
                                    </Typography>
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        Email
                                    </Typography>
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        Số điện thoại
                                    </Typography>
                                    <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                        Địa chỉ
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={10}>
                                {data.user && (
                                    <Box component="form" marginTop="20px" >
                                        <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                            {data.user[0].username}
                                        </Typography>
                                        <TextField
                                            sx={{ padding: "10px" }}
                                            variant="standard"
                                            fullWidth
                                            value={birthname}
                                            onChange={(e) => setBirthName(e.target.value)}
                                        />
                                        <Typography padding="15px" variant="body2" component="div" gutterBottom>
                                            {data.user[0].email}
                                        </Typography>
                                        <TextField
                                            sx={{ padding: "10px" }}
                                            variant="standard"
                                            fullWidth
                                            value={phonenumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                        <TextField
                                            sx={{ padding: "10px" }}
                                            variant="standard"
                                            fullWidth
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <Button onClick={handleSubmit} color="error" variant="contained" sx={{ mt: 3, mb: 2 }} >Cập nhật</Button>
                                    </Box>
                                )}
                                {success && <Alert severity="success">{success}</Alert>}
                            </Grid>
                        </Grid>
                    </Box>
                )
                }
            </Container >
        </div>
    )
}

export default Profile