import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import axios from 'axios';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^[A-z0-9-_]{8,24}$/;
const EMAIL_REGEX = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/;

function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleconfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            username: username,
            email: email,
            password: password
        }

        if (!USER_REGEX.test(username)) {
            alert("Username must be 4-24 characters long and start with a letter");
            return;
        }

        if (!EMAIL_REGEX.test(email)) {
            alert("Email is not valid");
            return;
        }

        if (!PWD_REGEX.test(password)) {
            alert("Password must be 8-24 characters");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post('api/users/register', data, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            console.log(res.data);
            window.location.href = "/login";
        } catch (err) {
            alert(err.response.data.message);
        }

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "#f44336" }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng ký tài khoản
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleUsernameChange}
                                autoComplete="given-name"
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="Tên đăng nhập"
                                autoFocus
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                onChange={handleEmailChange}
                                required
                                fullWidth
                                id="email"
                                label="Địa chỉ email"
                                name="email"
                                type="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handlePasswordChange}
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleconfirmPasswordChange}
                                required
                                fullWidth
                                name="password"
                                label="Nhập lại mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                        </Grid>

                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Đăng ký ngay
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Đã có tài khoản? Đăng nhập
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default Register;