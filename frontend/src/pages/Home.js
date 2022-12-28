import { Container, Grid, Pagination, Stack } from '@mui/material';

import Header from '../components/Header';
import ScrollTop from '../components/ScrollTop';
import Sidebar from '../components/Book/Sidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';
import AllBook from '../components/Book/AllBook';
import ControlledCarousel from '../components/Banner';
import BookByCategory from '../components/Book/BookByCategory';


function Home() {
    const [id, setId] = useState(1);
    const [data, setData] = useState({});
    const [page, setPage] = useState(1);

    const useSelectTabHandler = (id) => {
        setId(id);
    }

    const handleChangePage = (event, value) => {
        setPage(value);
    }

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/books/category/${id}?page=${page}`)
                .then(res => setData(res.data))
        }
        fetchData();
    }, [page, id]);

    return (
        <div >
            <Header />
            <Container style={{ marginTop: "100px" }} maxWidth="lg">
                <ControlledCarousel />
                <AllBook />
                <Grid sx={{ mt: 10 }} container spacing={1}>
                    <Grid item xs={3} >
                        <Sidebar onClickSelectTab={useSelectTabHandler} />
                    </Grid>
                    <Grid item xs={9}>
                        <BookByCategory response={data} />
                        <Stack direction="row" mt="20px" justifyContent="center" spacing={2}>
                            <Pagination color="error" count={2} page={page} onChange={handleChangePage}></Pagination>
                        </Stack>
                    </Grid>
                </Grid>
                <ScrollTop />
            </Container>
            <Footer />
        </div >
    )
}

export default Home;