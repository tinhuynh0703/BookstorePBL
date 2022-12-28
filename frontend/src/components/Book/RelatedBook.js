const { useState } = require("react");

const RelatedBook = () => {
    const [book, setBook] = useState([]);
    const { id } = useParams();
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(`api/books/category/${id}?page=${page}}`)
                .then(res => {
                    setBook(res.data)
                    console.log(res.data)
                })
        }
        fetchData();
    }, [id]);

    const handleChangePage = (event, value) => {
        setPage(value);
    }

    return (
        <div>
        </div>
    )
}

export default RelatedBook;