import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { Book } from "../types/bookcard";

type BookProps = {
  book: Book;
};
function BookCard({ book }: BookProps) {
  return (
    <Grid md={12} lg={4}>
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
            objectFit: "fill",
            flexGrow: 1,
            height: "290px",
            width: "200px",
            alignSelf: "center",
            m: "10px 0 10px 5px",
          }}
          image={book.imageUrlL}
          alt="bookimage"
        />
        <CardContent
          sx={{
            maxHeight: "290px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              wordWrap: "normal",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {book.bookTitle}
          </Typography>
          <Typography variant="subtitle1" sx={{ wordBreak: "break-word" }}>
            {book.bookAuthor}
          </Typography>
          <Rating name="read-only" value={4} readOnly />
        </CardContent>
      </Card>
    </Grid>
  );
}

export default BookCard;
