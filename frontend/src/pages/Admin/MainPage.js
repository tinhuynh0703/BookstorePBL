import { Container, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from '../Admin/Header';

const MainPage = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Header />
            <Container style={{ marginTop: "100px", paddingTop: "20px", border: "1px solid #ccc", borderRadius: "10px", height: "600px", overflow: 'auto' }} maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={3} >
                        <Tabs
                            orientation="vertical"
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider', position: 'fixed' }}>
                            <Tab label="Tài khoản của tôi" to="/admin/account/profile" component={Link} />
                            <Tab label="Tất cả sách" to="/admin/account/book" component={Link} />
                            <Tab label="Thêm sách" to="/admin/account/book/add" component={Link} />
                            <Tab label="Tài khoản khách hàng" to="/admin/account/customer" component={Link} />
                            <Tab label="Tài khoản admin" to="/admin/account/admin" component={Link} />
                            <Tab label="Đổi mật khẩu" to="/admin/account/password" component={Link} />
                        </Tabs>
                    </Grid>
                    <Grid item xs={9} >
                        <Outlet style={{
                            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 13%)",
                            borderRadius: "0.125rem"
                        }} />
                    </Grid>
                </Grid>
            </Container>
        </div >
    );
}

export default MainPage;