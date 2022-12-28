import { Card, CardActionArea, CardMedia, Grid, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useNavigate } from 'react-router-dom';

function ControlledCarousel() {
    const [books, setBooks] = useState([]);
    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        axios
            .get(`api/books?page=3`)
            .then(res => {
                setBooks(res.data)
                console.log(res.data);
            })
    }, []);

    const navigateToBookDetail = (id) => {
        navigate(`/books/${id}`,)
    }

    return (
        <div style={{ display: "flex" }}>
            <Grid container spacing={1}>
                <Grid item xs={9}>
                    <Paper>
                        <img style={{ width: "100%", height: "300px" }} alt="" src="https://cdn0.fahasa.com/media/magentothem/banner7/bigsale_t11_resize_840x320.jpg">
                        </img>
                    </Paper>
                </Grid>
                <Grid item xs={3}>
                    <Carousel style={{ width: "100%", height: "300px" }} activeIndex={index} onSelect={handleSelect}>
                        {books.bookList && books.bookList.map((book, index) => {
                            return (
                                <Carousel.Item style={{ width: "300px", height: "300px" }} interval="2000" key={index}>
                                    <Card sx={{ height: "100%" }} style={{ boxShadow: "0 0 5px #ccc" }}>
                                        <CardActionArea onClick={() => navigateToBookDetail(book.bookId)}>
                                            <CardMedia
                                                component="img"
                                                image={book.bookImg}
                                                alt="image"
                                            />
                                            <Carousel.Caption style={{ position: "relative", bottom: 110 }}>
                                                <img width="70px" alt="" src="https://freesvg.org/img/Best-seller-stamp.png">
                                                </img>
                                            </Carousel.Caption>
                                        </CardActionArea>
                                    </Card>
                                </Carousel.Item>
                            )
                        }
                        )}
                    </Carousel>
                </Grid>
            </Grid>
        </div >
    );
}

export default ControlledCarousel;
