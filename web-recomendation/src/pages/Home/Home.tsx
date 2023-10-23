import { Container, Box } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import BookCard from "../../components/BookCard";
import { useGetBooksQuery } from "../../store/bookApi";
import { Book } from "../../types/bookcard";

function Home() {
  const { data } = useGetBooksQuery("");
  console.log(data);
  return (
    <Box>
      <Container maxWidth={false} sx={{ mt: "50px", maxWidth: "1600px" }}>
        <Grid2
          container
          rowSpacing={3}
          sx={{
            margin: "0 auto",
            maxWidth: { xs: "min-content", lg: "1500px" },
          }}
        >
          {data?.map((book: Book) => (
            <BookCard book={book} key={book.ISBN} />
          ))}
        </Grid2>
      </Container>
    </Box>
  );
}

export default Home;
