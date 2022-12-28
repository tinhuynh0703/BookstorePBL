import { Alert, Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';

const AddBook = () => {
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [category, setCategory] = useState('')
    const [success, setSuccess] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleAuthorChange = (e) => {
        setAuthor(e.target.value)
    }
    const handlePriceChange = (e) => {
        setPrice(e.target.value)
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handleImageChange = (e) => {
        setImage(e.target.value)
    }
    const handleCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            bookName: name,
            bookAuthor: author,
            bookPrice: price,
            bookDes: description,
            bookImg: image,
            catId: category
        }
        axios.post('api/books', data, {
            headers: {
                'token': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res.data)
                setSuccess(res.data.message)
            })
    }

    return (
        <div>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <AddIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Thêm sách
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, p: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleNameChange}
                                value={name}
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Tên sách"
                                name="name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleAuthorChange}
                                value={author}
                                margin="normal"
                                required
                                fullWidth
                                id="author"
                                label="Tác giả"
                                name="author"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                onChange={handlePriceChange}
                                value={price}
                                margin="normal"
                                required
                                fullWidth
                                id="price"
                                label="Đơn giá"
                                name="price"
                            />
                            <Box sx={{ mt: 2, display: "flex", gap: "10px", justifyContent: "space-between" }}>
                                <Typography>Thể loại:</Typography>
                                <select name="chọn" style={{ outline: "none" }} onChange={handleCategoryChange}>
                                    <option value="0">Chọn thể loại</option>
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
                        <Grid item xs={6}>
                            <TextField
                                onChange={handleDescriptionChange}
                                value={description}
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Mô tả"
                                multiline
                                rows={4}
                                name="description"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                onChange={handleImageChange}
                                value={image}
                                margin="normal"
                                required
                                fullWidth
                                id="image"
                                label="Hình ảnh"
                                name="image"
                            />
                        </Grid>
                        <Grid item xs={6}>

                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mb: 2 }}
                    >
                        Thêm
                    </Button>
                    {success && <Alert severity="success">{success}</Alert>}
                </Box>
            </Box>
        </div>
    )
}

export default AddBook
