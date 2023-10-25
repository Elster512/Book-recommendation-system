import React from "react";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Tooltip,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Book } from "../types/bookcard";
import { Link } from "react-router-dom";

interface IBookProps {
  book: Book;
}

const BookCard: React.FC<IBookProps> = ({ book }) => {
  return (
    <Grid md={12} lg={4}>
      <Link to={book.ISBN} style={{ textDecoration: "none" }}>
        <Card
          sx={{
            width: "400px",
            height: "300px",
            m: "0 auto",
            display: "flex",
            gap: "2px",
            p: "2px",
            boxSizing: "border-box",
            background: "white",
            transition: "background 1s",
            ":hover": {
              background: "#1976d2",
            },
          }}
        >
          <CardMedia
            component="img"
            sx={{
              objectFit: "contain",
              height: "290px",
              maxWidth: "200px",
              minWidth: "200px",
              alignSelf: "center",
              m: "10px 0 10px 5px",
            }}
            image={book.imageUrlL}
            alt="bookimage"
          />
          <CardContent
            sx={{
              maxHeight: "290px",
              width: "200px",
            }}
          >
            <Tooltip
              title={book.bookTitle}
              placement="top"
              componentsProps={{
                arrow: {
                  sx: {
                    color: "gray",
                  },
                },

                tooltip: {
                  sx: {
                    background: "gray",
                    color: "white",
                  },
                },
              }}
              arrow
            >
              <Typography
                variant="h6"
                sx={{
                  wordWrap: "normal",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {book.bookTitle}
              </Typography>
            </Tooltip>
            <Typography variant="subtitle1" sx={{ wordBreak: "break-word" }}>
              {book.bookAuthor}
            </Typography>
            <Rating
              name="read-only"
              value={book.bookRating}
              readOnly
              precision={0.5}
            />
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default BookCard;
