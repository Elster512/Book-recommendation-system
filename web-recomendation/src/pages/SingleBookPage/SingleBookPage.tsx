import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

import { Container, Box, Typography, Button } from "@mui/material";
import {
  useGetRecBooksForBookQuery,
  useGetSingleBookQuery,
} from "../../store/bookApi";
import Loader from "../../components/UI/Loader/Loader";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Colors } from "../../Colors/Colors";
import Reccomendations from "../../components/Carousel/Reccomendation/Reccomendations";
import Description from "../../components/SingleBookPage/Description/Description";
import { Book } from "../../types/bookcard";
import DeliveryBlock from "../../components/SingleBookPage/DeliveryBlock/DeliveryBlock";

const SingleBookPage: React.FC = () => {
  const { bookID } = useParams();
  const navigate = useNavigate();

  const {
    data: rec_books,
    isLoading: recLoading,
    isError: recError,
  } = useGetRecBooksForBookQuery(bookID);
  const {
    data: singleBook,
    isLoading: singleBookLoading,
    isError: singleBookError,
  } = useGetSingleBookQuery(bookID);

  const onClickHandler = () => {
    navigate("/");
  };

  if (singleBookError) {
    navigate("/", { replace: true });
  }
  if (singleBookLoading) {
    return (
      <Container
        maxWidth={false}
        sx={{
          position: "absolute",
          top: "50%",
          transform: "translate(0,-50%)",
        }}
      >
        <Loader />
      </Container>
    );
  }
  return (
    <Box>
      <Container maxWidth={false} sx={{ maxWidth: "1300px" }}>
        <Grid2 container spacing={2} sx={{ mt: "20px", mb: "20px" }}>
          <Grid2 xs={12}>
            <Button
              onClick={onClickHandler}
              sx={{
                color: "white",
                width: "100px",
                pl: "0",
                backgroundColor: Colors.hover,
                "&:hover": { backgroundColor: Colors.selected },
              }}
            >
              <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "20px" }} />
              <Typography sx={{ ml: "5px" }}>BACK</Typography>
            </Button>
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Box
              component="img"
              sx={{
                m: "0 auto",
                boxShadow: 3,
                borderRadius: "10px",
                display: "block",
                minHeight: "400px",
                minWidth: "305px",
                maxHeight: "500px",
                maxWidth: "min-content",
                objectFit: "contain",
              }}
              src={singleBook?.book.imageUrlL}
              alt={singleBook?.book.bookTitle}
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Description book={singleBook?.book as Book} />

            <DeliveryBlock />
          </Grid2>
        </Grid2>
        <Reccomendations
          onSinglePage={true}
          recError={recError}
          recLoading={recLoading}
          rec_books={rec_books?.rec_books}
        />
      </Container>
    </Box>
  );
};

export default SingleBookPage;
