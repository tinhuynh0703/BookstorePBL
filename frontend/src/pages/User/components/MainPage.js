import { Container, Grid, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../../../components/Header";

const AdminMainPage = () => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <Header />
            <Container style={{ marginTop: "100px" }} maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={3} >
                        <Tabs
                            orientation="vertical"
                            value={value}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="Vertical tabs example"
                            sx={{ borderRight: 1, borderColor: 'divider' }}>
                            <Tab label="Tài khoản của tôi" to="/user/account/profile" component={Link} />
                            <Tab label="Đơn mua" to="/user/account/order" component={Link} />
                            <Tab label="Thông báo" to="/user/account/notification" component={Link} />
                            <Tab label="Đổi mật khẩu" to="/user/account/password" component={Link} />
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

export default AdminMainPage;