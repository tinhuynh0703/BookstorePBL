import { Autocomplete, Box, Stack, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = () => {
            axios.get("api/books")
                .then(res => {
                    setData(res.data.bookList)
                })
        }
        fetchData();
    }, [])

    const handleNavigateToBookDetail = (id) => {
        navigate(`/books/${id}`);
    }

    return (
        <div>
            <Stack sx={{}}>
                <Autocomplete
                    id="combo-box-demo"
                    options={data}
                    getOptionLabel={(data) => data.bookName}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} variant="standard" placeholder="Tìm kiếm..." />}
                    renderOption={(props, data) => (
                        <Box  {...props} key={data.bookId}>
                            <li onClick={() => handleNavigateToBookDetail(data.bookId)} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <img src={data.bookImg} alt="" width="60px" />
                                <Typography sx={{ fontSize: 14 }} color="text.primary">
                                    {data.bookName}
                                </Typography>
                            </li>
                        </Box>
                    )}
                />
            </Stack>
        </div >
    );
}
export default SearchBar;