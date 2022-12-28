import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

function GoBackBtn() {
    const navigate = useNavigate();
    const handleReturn = () => navigate(-1);
    return (
        <Button
            color="error"
            startIcon={<ArrowBackIcon />}
            onClick={handleReturn}
        >
            Trở về
        </Button>
    )
}

export default GoBackBtn;