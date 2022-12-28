import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Review() {
    const [data, setData] = useState([])
    const [subtotal, setSubtotal] = useState(0);
    const [total, setTotal] = useState(0);
    const shippingFee = 15000;
    const username = useSelector(userSelector);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/carts/${username}`, {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setData(res.data.data);
                    console.log(res.data.data);
                })
        }
        fetchData();
    }, [username])

    useEffect(() => {
        let subTotal = 0;
        data.forEach(item => {
            subTotal += item.totalprice;
        })
        setSubtotal(subTotal);
        setTotal(subTotal + shippingFee);
    }, [data])

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                Xác nhận thanh toán
            </Typography>
            <TableContainer component={Box}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sản phẩm</TableCell>
                            <TableCell ></TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell align='center'>Số lượng</TableCell>
                            <TableCell align='center'>Số tiền </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.bookId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell><img style={{ maxWidth: "100px" }} src={item.bookImg} alt=""></img></TableCell>
                                <TableCell align="left">{item.bookName}</TableCell>
                                <TableCell>{item.bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })} </TableCell>
                                <TableCell align="center">{item.amount}</TableCell>
                                <TableCell align="center">{item.totalprice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</TableCell>
                            </TableRow>
                        )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box style={{ display: "flex", justifyContent: "flex-end" }}>
                <Box style={{ opacity: "0.8", padding: "40px", display: "flex", flexDirection: "column", gap: "10px", justifyContent: "flex-end" }}>
                    <Typography style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                        Tổng tiền hàng: {subtotal.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </Typography>
                    <Typography style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        Phí vận chuyển: {shippingFee.toLocaleString('vi', { style: 'currency', currency: 'VND' })}
                    </Typography>
                    <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        Tổng thanh toán: <Typography variant='h5' color="red">{total.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Typography>
                    </Box>
                </Box>
            </Box>

        </React.Fragment >
    );
}