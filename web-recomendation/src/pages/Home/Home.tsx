import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import BookCard from '../../components/BookCard';
import { useGetBooksQuery } from '../../store/bookApi';
import { Book } from '../../types/bookcard';
import BookPagination from '../../components/BookPagination';
import { useSearchParams } from 'react-router-dom';
import { pageChecker } from '../../helpers/ParamsChecker';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: books,
    isError,
    isLoading: loadBooks,
  } = useGetBooksQuery(searchParams.get('page') || '1');

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (!pageChecker(pageParam)) {
      const page = 1;
      setSearchParams({ page: page.toString() });
    }
  });
  if (isError) {
    setSearchParams({ page: '1' });
  }
  if (loadBooks) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Container maxWidth={false} sx={{ mt: '50px', maxWidth: '1600px' }}>
        <Grid2
          container
          rowSpacing={3}
          sx={{
            margin: '0 auto',
            maxWidth: { xs: 'min-content', lg: '1300px' },
          }}
        >
          {books?.books.map((book: Book) => (
            <BookCard book={book} key={book.ISBN} />
          ))}
        </Grid2>
      </Container>
      <BookPagination
        pages={books?.pages as number}
        page={books?.page as number}
      />
    </Box>
  );
};

export default Home;
