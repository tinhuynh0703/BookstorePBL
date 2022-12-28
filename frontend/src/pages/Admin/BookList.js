import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BookList = () => {
    const [book, setBook] = useState([]);
    const [detailBook, setDetailBook] = useState([]);
    const [searchedVal, setSearchedVal] = useState("");
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");
    const [idBook, setIdBook] = useState("");
    const [success, setSuccess] = useState("");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/books`, {
                    headers: {
                        'token': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => {
                    setBook(res.data.bookList);
                })
        }
        fetchData();
    }, [])

    const handleViewDetail = (id) => {
        console.log(id)
        axios
            .get(`api/books/${id}`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                setDetailBook(res.data.book)
                setName(res.data.book[0].bookName)
                setAuthor(res.data.book[0].bookAuthor)
                setPrice(res.data.book[0].bookPrice)
                setDescription(res.data.book[0].bookDes)
                setImage(res.data.book[0].bookImg)
                setQuantity(res.data.book[0].amount)
                setCategory(res.data.book[0].catId)
                setIdBook(res.data.book[0].bookId)
            })
        setOpen(true)

    }

    const handleDeleteBook = (id) => {
        axios
            .delete(`api/books/${id}`, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                setSuccess(res.data.message)
            })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpdateBook = (id) => {
        const data = {
            bookName: name,
            bookAuthor: author,
            bookPrice: price,
            bookDes: description,
            bookImg: image,
            amount: quantity,
            catId: category
        }
        axios
            .patch(`api/books/${id}`, data, {
                headers: {
                    'token': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(res => {
                console.log(res.data)
                setOpen(false)
                setSuccess(res.data.message)
            })
    }

    return (
        <div>
            <TableContainer sx={{ px: 2 }} component={Box}>
                <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <Typography variant="h6" component="div" gutterBottom>
                        Danh sách sản phẩm
                    </Typography>
                    <Box sx={{ position: "absolute", right: "272px", backgroundColor: "#FFF", zIndex: 1 }}>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Tìm kiếm..."
                            onChange={(e) => setSearchedVal(e.target.value)}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Divider></Divider>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Tên sách</TableCell>
                            <TableCell>Tên tác giả</TableCell>
                            <TableCell>Đơn giá</TableCell>
                            <TableCell align="center">Sửa</TableCell>
                            <TableCell align="center">Xóa</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {book.filter((item) => {
                            if (searchedVal === "") {
                                return item
                            } else if (item.bookName.toLowerCase().includes(searchedVal.toLowerCase())) {
                                return item
                            }
                        }).map((item) => (

                            <TableRow key={item.bookId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.bookName}
                                </TableCell>
                                <TableCell>{item.bookAuthor}</TableCell>
                                <TableCell >{item.bookPrice.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => handleViewDetail(item.bookId)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleDeleteBook(item.bookId)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>

                            </TableRow>
                        ))
                        }
                        {success && <Alert severity="success">{success}</Alert>}

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="scroll-dialog-title"
                            aria-describedby="scroll-dialog-description"
                            maxWidth="lg"

                        >
                            <DialogTitle id="scroll-dialog-title">Chỉnh sửa thông tin sách</DialogTitle>
                            <DialogContent dividers>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Tên sách"
                                            name="name"
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            value={name}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Tên tác giả"
                                            name="author"
                                            onChange={(e) => setAuthor(e.target.value)}
                                            required
                                            value={author}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Giá"
                                            name="price"
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                            value={price}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box sx={{ mt: 2, display: "flex", gap: "20px" }}>
                                            <Typography>Thể loại:</Typography>
                                            <select name="chọn" style={{ outline: "none" }} onChange={(e) => setCategory(e.target.value)}>
                                                <option>Chọn thể loại</option>
                                                <option value="1">Ngôn tình, tình cảm</option>
                                                <option value="2">Kinh dị</option>
                                                <option value="3">Trinh thám</option>
                                                <option value="4">Khoa học viễn tưởng</option>
                                                <option value="5">Cổ tích, thiếu nhi</option>
                                                <option value="6">Giáo khoa, kiến thức</option>
                                                <option value="7">Tiểu sử, tự truyện</option>
                                                <option value="8">Bí ẩn</option>
                                                <option value="9">Hành động, phiêu lưu</option>
                                                <option value="10">Tâm lý</option>
                                                <option value="11">Lịch sử</option>
                                            </select>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Mô tả"
                                            name="description"
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                            multiline
                                            rows={4}
                                            value={description}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label="Số lượng"
                                            name="quantity"
                                            onChange={(e) => setQuantity(e.target.value)}
                                            required
                                            value={quantity}
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Hình ảnh"
                                            name="image"
                                            onChange={(e) => setImage(e.target.value)}
                                            required
                                            value={image}
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Đóng</Button>
                                <Button variant="contained" onClick={() => handleUpdateBook(idBook)}>Lưu</Button>
                            </DialogActions>
                        </Dialog>

                    </TableBody>
                </Table>
            </TableContainer >
        </div >
    )
}

export default BookList