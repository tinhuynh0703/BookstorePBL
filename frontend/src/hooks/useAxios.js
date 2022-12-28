import axios from 'axios';
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:3000/";

const useAxios = ({ url }) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setResponse(response.data)
            setLoading(false)
            setError("")
        }
        fetchData();
    }, [url]);

    return { response, error, loading }
}

export default useAxios;

