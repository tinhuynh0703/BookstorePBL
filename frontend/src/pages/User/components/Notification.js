import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Box } from '@mui/material';
const Notification = () => {
    return (
        <div>
            <section>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: "20px" }}>
                    <NotificationsOffIcon fontSize="large" />
                    <div>Không có thông báo nào</div>
                </Box>
            </section>
        </div>
    )
}

export default Notification