import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Fab } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function ScrollTop() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };
    return (
        <div style={{ position: 'relative' }}>
            {showTopBtn && (
                <Box
                    onClick={goToTop}
                    role="presentation"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}

                >
                    <Fab color="warning" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </Box>

            )}
        </div>
    );
}

export default ScrollTop;
