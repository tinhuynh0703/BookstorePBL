import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MDBRipple } from "mdb-react-ui-kit";

// import CircularProgress from '@mui/material/CircularProgress';
// import { Box } from '@mui/system';

function BookByCategory({ response }) {
  const navigate = useNavigate();

  // if (loading) {
  //     return (
  //         <Box sx={{
  //             height: "100vh",
  //             display: 'flex',
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //         }}>
  //             <CircularProgress />
  //         </Box>
  //     )
  // }

  // if (error) {
  //     return (
  //         <Typography textAlign="center" variant="h6" mt={20} color="red" > Something Went Wrong!
  //         </Typography>
  //     )
  // }

  const navigateToBookDetail = (id) => {
    navigate(`/books/${id}`);
  };

  return (
    <Grid container spacing={1}>
      {response.bookList &&
        response.bookList.map((book, index) => {
          return (
            <Grid item xs={3} key={index}>
              <Card
                sx={{ height: "100%" }}
                style={{ boxShadow: "0 0 5px #ccc" }}
              >
                <CardActionArea
                  onClick={() => navigateToBookDetail(book.bookId)}
                  component="div"
                >
                  <MDBRipple
                    rippleTag="div"
                    className="bg-image hover-overlay hover-zoom "
                  >
                    <CardMedia
                      component="img"
                      image={book.bookImg}
                      alt="image"
                    />
                  </MDBRipple>
                  <CardContent>
                    <Typography variant="h7" component="div" mb={1} noWrap>
                      {book.bookName}
                    </Typography>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body1" color="red">
                          {book.bookPrice.toLocaleString("vi", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Rating
                          size="small"
                          name="read-only"
                          value={book.avgRating ?? 0}
                          readOnly
                        ></Rating>
                      </Grid>
                    </Grid>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
}

export default BookByCategory;
