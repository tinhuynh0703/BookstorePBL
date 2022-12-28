import { Alert, Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/selectors";

const Password = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const username = useSelector(userSelector);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu mới không trùng khớp');
            return;
        }
        const data = {
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }
        axios.patch(`api/users/${username}/password`, data, {
            headers: {
                'token': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data);
                setSuccess(res.data.message);
                setError('');
            }
            )
            .catch(err => {
                setError(err.response.data.message);
                setSuccess('');
            }
            )
    }

    return (
        <div>
            <Container sx={{ p: 2 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <Typography variant="h6" gutterBottom component="div">
                            Đổi mật khẩu
                        </Typography>
                        <Typography marginBottom="20px" variant="body2" component="div" gutterBottom>
                            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
                        </Typography>
                        <Divider />
                        <Box component="form" onSubmit={handleSubmit} >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="newPassword"
                                label="Mật khẩu mới"
                                name="newPassword"
                                type="password"
                                value={newPassword}
                                autoComplete="new-password"
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="confirmPassword"
                                label="Nhập lại mật khẩu mới"
                                name="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="error"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Đổi mật khẩu
                            </Button>
                        </Box>
                        {error && <Alert severity="error">{error}</Alert>}
                        {success && <Alert severity="success">{success}</Alert>}
                    </Grid>
                </Grid>
            </Container>
        </div >
    )
}

export default Password