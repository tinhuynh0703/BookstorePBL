import { useState } from "react";

function ReadMore({ children }) {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <span>
            {isReadMore ? text.slice(0, 250) : text}
            <span onClick={toggleReadMore} style={{ color: "#1E90FF", cursor: "pointer" }}>
                {isReadMore ? " ...Xem tiếp" : " ...Rút gọn"}
            </span>
        </span>
    );
}

export default ReadMore