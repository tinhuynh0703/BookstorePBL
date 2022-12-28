import { Alert, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const AdminList = () => {
    const [admin, setAdmin] = useState([]);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchData = () => {
            axios
                .get('api/admins', {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setAdmin(res.data.admins);
                    console.log(res.data.admins)
                })
        }
        fetchData();
    }, [])

    const handleResetPassword = (username) => {
        axios.create({
            headers: {
                'token': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .patch(`api/admins/reset-password/${username}`)
            .then(res => {
                console.log(res.data);
                setSuccess(res.data.message);
            })
    }

    return (
        <div>
            <TableContainer sx={{ px: 2 }} component={Box}>
                <Typography variant="h6" component="div" gutterBottom>
                    Danh sách tài khoản
                </Typography>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên tài khoản</TableCell>
                            <TableCell>Họ tên</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Số điện thoại</TableCell>
                            <TableCell>Địa chỉ</TableCell>
                            <TableCell>Reset</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {admin.map((item) => (
                            <TableRow key={item.username}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.username}
                                </TableCell>
                                <TableCell>{item.birthname}</TableCell>
                                <TableCell >{item.email}</TableCell>
                                <TableCell>{item.phonenumber}</TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="reset"
                                        onClick={() => handleResetPassword(item.username)}>
                                        <RestartAltIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {success &&
                    <Alert
                        onClose={() => setSuccess('')}
                        sx={{}}
                        severity="success">{success}
                    </Alert>}
            </TableContainer>
        </div>
    )
}

export default AdminList