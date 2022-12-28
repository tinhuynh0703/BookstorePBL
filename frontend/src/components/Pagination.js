import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination() {
    // const [page, setPage] = React.useState({
    //     getPage: (page) => {
    //         console.log(page);

    //     });

    return (
        <Stack direction="row" spacing={2} mt="20px" justifyContent="center">
            <Pagination count={10} color="error"
            // onChange={(event, value) => {
            //     page.getPage(value);
            // }}
            />
        </Stack>
    );
}