import { Box, Card, CircularProgress, Divider, Tab, Tabs, Typography } from "@mui/material";
import useAxios from "../../hooks/useAxios";
import { useState } from "react";

function Sidebar(props) {
    const { response, error, loading } = useAxios({ url: "api/categories" })
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const idSelected = response.categoryList[newValue].catId;
        props.onClickSelectTab(idSelected)
    };

    if (loading) {
        return (
            <Box sx={{
                height: "100vh",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <CircularProgress />
            </Box>
        )
    }

    if (error) {
        return (
            <Typography textAlign="center" variant="h6" mt={20} color="red" > Something Went Wrong!
            </Typography>
        )
    }

    return (
        <div>
            <Card style={{ boxShadow: "0 0 5px #ccc" }}>
                <Typography variant="h6" sx={{ mt: 2, mb: 2 }} textAlign='center' >Sách theo danh mục</Typography>
                <Divider />
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    {response.categoryList && response.categoryList.map((category) => {
                        return (
                            <Tab key={category.catId} label={category.catName} />
                        )
                    })}
                </Tabs>
            </Card>
        </div >
    );
}

export default Sidebar;