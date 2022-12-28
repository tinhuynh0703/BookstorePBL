import axios from "axios";
import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

function Comment() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`api/comments/book/${id}`, {
          headers: {
            token: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setData(res.data);
        });
    };
    fetchData();
  }, [id]);

  return (
    <Paper elevation={8} sx={{ my: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" gutterBottom component="div" padding="20px">
          ĐÁNH GIÁ SẢN PHẨM
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          ({data.commentList?.length} đánh giá)
        </Typography>
      </Box>

      <Divider />
      {data.commentList &&
        data.commentList.map((comment, index) => (
          <List key={index} sx={{ width: "100%", bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
              <ListItemText>
                <Typography variant="h7" gutterBottom component="div">
                  {comment.username}
                </Typography>
                <React.Fragment>
                  <Rating
                    name="read-only"
                    value={comment.rating ?? 0}
                    readOnly
                  ></Rating>
                  <br></br>
                  <small style={{ opacity: "0.8" }}>
                    {comment.date.split("T").join(" ").split(".000Z").join("")}
                  </small>
                  <br></br>
                  <Typography
                    fontWeight={"500"}
                    marginTop="10px"
                    variant="h7"
                    gutterBottom
                    component="div"
                  >
                    {comment.content}
                  </Typography>
                </React.Fragment>
              </ListItemText>
            </ListItem>
            <Divider />
          </List>
        ))}
    </Paper>
  );
}

export default Comment;
