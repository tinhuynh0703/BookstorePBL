import { Button, Box, Card, CardMedia, Container, Divider, Fade, Grid, List, ListItem, ListItemText, Paper, TextField, Typography, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReadMore from "../components/ReadMore";
import { useNavigate } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";

function BookDetail() {
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState({});
    const { id } = useParams();

    const username = useSelector(userSelector);

    const navigate = useNavigate();
    // const { response, error, loading } = useAxios({ url: `/api/books/${id}` })

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/books/${id}`)
                .then(res => {
                    setData(res.data)
                    console.log(res.data)
                })
        }
        fetchData();
    }, [id]);

    const handleChangeQuantity = (e) => {
        setQuantity(Number(e.target.valueAsNumber));
        console.log(quantity);
    }

    const handleAddBookIntoCart = () => {
        const data = {
            bookAmount: quantity,
        }
        axios
            .post(`api/carts/${username}/book/${id}`, data, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data);
            })
        navigate('/cart');
    }

    return (
        <div>
            <Header />
            <Container maxWidth="lg">
                {data.book && (
                    <Paper elevation={8}>
                        <Grid container mt={12} className='animate__animated animate__fadeIn' spacing={3}>
                            <Grid item xs={5} className='animate__animated animate__fadeInLeft' >
                                <Fade in>
                                    <CardMedia component='img' image={data.book[0].bookImg} alt={id} />
                                </Fade>
                            </Grid>
                            <Grid item xs={7} >
                                <List>
                                    <ListItem style={{ justifyContent: "space-between" }}>
                                        <Typography variant="h6">{data.book[0].bookName}</Typography>
                                        <Box display="flex" alignItems="center" gap="10px">
                                            <Typography variant="h7" color="red">{Math.round((data.book[0].avgRating) * 10) / 10 ?? 0} / 5</Typography>
                                            <Rating name="read-only" value={data.book[0].avgRating ?? 0} readOnly />
                                        </Box>
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Tác giả' secondary={data.book[0].bookAuthor} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Giá' secondary={<Typography variant="h4" color="red">{data.book[0].bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })} </Typography>} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Mô tả' secondary={<ReadMore>{data.book[0].bookDes}</ReadMore>} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Trạng thái' secondary={data.book[0].enable ? "Còn hàng" : "Hết hàng"} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary='Số lượng' />
                                        <TextField
                                            sx={{ mx: 1 }}
                                            value={quantity}
                                            onChange={handleChangeQuantity}
                                            variant='outlined'
                                            size='small'
                                            type='number'
                                            inputProps={{ min: 1, max: 10 }}
                                        />
                                        <Typography variant="h7">{data.book[0].amount} sản phẩm có sẵn</Typography>
                                    </ListItem>
                                    <div>
                                        {localStorage.getItem('token') ?
                                            (
                                                localStorage.getItem('role') === '1' ?
                                                    ""
                                                    : (
                                                        <Button
                                                            variant='outlined'
                                                            color='error'
                                                            onClick={handleAddBookIntoCart}
                                                            startIcon={<ShoppingCartIcon />}
                                                            sx={{ my: 2 }}
                                                        >
                                                            Thêm vào giỏ hàng
                                                        </Button>
                                                    )
                                            ) : (
                                                <Button
                                                    variant='outlined'
                                                    color='error'
                                                    onClick={() => navigate('/login')}
                                                    startIcon={<ShoppingCartIcon />}
                                                    sx={{ my: 2 }}
                                                >
                                                    Đăng nhập để mua hàng
                                                </Button>
                                            )
                                        }
                                    </div>
                                </List>
                            </Grid>
                        </Grid>
                    </Paper>
                )
                }
                <Comment />
            </Container>
            <Footer />
        </div >
    )
}

export default BookDetail   