import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/selectors';
import axios from 'axios';
import { Box, Button } from '@mui/material';

export default function AddressForm() {
    const [data, setData] = useState({})
    const [birthname, setBirthName] = useState("");
    const [phonenumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const username = useSelector(userSelector);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/users/${username}`, {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setData(res.data)
                    setBirthName(res.data.user[0].birthname);
                    setPhoneNumber(res.data.user[0].phonenumber);
                    setAddress(res.data.user[0].address);
                })
        }
        fetchData();
    }, [username])

    // const handleCreateReceiver = () => {
    //     const data = {
    //         receiverName: birthname,
    //         receiverPhone: phonenumber,
    //         receiverAddress: address
    //     }
    //     axios
    //         .patch(`api/receivers/${username}`, data, {
    //             headers: {
    //                 'token': `Bearer ${localStorage.getItem('token')}`
    //             }
    //         }
    //         )
    //         .then(res => {
    //             console.log(res.data)
    //         })
    // }

    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Thông tin người nhận
            </Typography>
            <Grid container sx={{ p: 2 }} spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Họ tên người nhận"
                        fullWidth
                        variant="standard"
                        value={birthname}
                        onChange={(e) => setBirthName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        label="Số điện thoại"
                        fullWidth
                        variant="standard"
                        value={phonenumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Địa chỉ nhận hàng"
                        fullWidth
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>
            </Grid>
            {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                    variant="contained"
                    color="warning"
                    onClick={handleCreateReceiver}
                >
                    Tiếp theo
                </Button>
            </Box> */}
        </div>
    );
}