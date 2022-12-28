import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { Divider, Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

function Copyright() {
    return (
        <Typography variant="body2" color="#fff">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Bookstore.org
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'} All Rights Reserved.
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                mt: '50px',
            }}
            backgroundColor="#222529"
            color="#fff"
        >
            <CssBaseline />
            <Container component="main" sx={{ mt: 8 }} maxWidth="lg">
                <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="#fff" gutterBottom>
                            ABOUT US
                        </Typography>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Team
                            </Link>


                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                History
                            </Link>


                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Contact us
                            </Link>


                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Locations
                            </Link>
                        </div>



                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="#fff" gutterBottom>
                            CONTACT INFO
                        </Typography>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Cool stuff
                            </Link>


                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Random feature
                            </Link>

                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Team feature
                            </Link>

                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Developer stuff
                            </Link>

                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Another one
                            </Link>
                        </div>

                        <Box>
                            <Link margin="5px" underline='none' href="#" variant="subtitle1" color="#fff">
                                <FacebookIcon />
                            </Link>
                            <Link margin="5px" underline='none' href="#" variant="subtitle1" color="#fff">
                                <TwitterIcon />
                            </Link>
                            <Link margin="5px" underline='none' href="#" variant="subtitle1" color="#fff">
                                <InstagramIcon />
                            </Link>
                        </Box>


                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" color="#fff" gutterBottom>
                            CUSTOMER SERVICE
                        </Typography>

                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Cool stuff
                            </Link>

                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Random feature
                            </Link>

                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Team feature
                            </Link>

                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Developer stuff
                            </Link>

                            <Link underline='none' href="#" variant="subtitle1" color="#fff">
                                Another one
                            </Link>
                        </div>

                    </Grid>

                </Grid>
                <Divider style={{ marginTop: "10px", opacity: "0.1" }} color="#fff"></Divider>
            </Container >

            <Box
                component="footer"
                sx={{
                    py: 3,
                    px: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Copyright />
                </Container>
            </Box>
        </Box >
    );
}