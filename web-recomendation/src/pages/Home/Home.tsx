import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';

import { useGetBooksQuery, useGetRecBooksQuery } from '../../store/bookApi';

import BookPagination from '../../components/Home/BookPagination';
import { useSearchParams } from 'react-router-dom';
import { pageChecker } from '../../helpers/ParamsChecker';
import Reccomendations from '../../components/Reccomendations';
import Loader from '../../components/Layout/Loader';
import BooksList from '../../components/Home/BooksList';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: reccomendedBooks,
    isError: recError,
    isLoading: loadingRecBooks,
  } = useGetRecBooksQuery();
  const {
    data: books,
    isError: bookError,
    isFetching: fetchingBooks,
    isLoading: loadingBooks,
  } = useGetBooksQuery(searchParams.get('page') || '1');

  useEffect(() => {
    const pageParam = searchParams.get('page');
    if (!pageChecker(pageParam)) {
      const page = 1;
      setSearchParams({ page: page.toString() });
    }
  });
  if (bookError) {
    setSearchParams({ page: '1' });
  }
  if (loadingBooks) {
    return (
      <Container
        maxWidth={false}
        sx={{
          position: 'absolute',
          top: '50%',
          transform: 'translate(0,-50%)',
        }}
      >
        <Loader />
      </Container>
    );
  }
  return (
    <Box>
      <Container
        maxWidth={false}
        sx={{
          mt: '50px',
          maxWidth: '1600px',
          minHeight: '1400px',
          height: '100%',
        }}
      >
        <Reccomendations
          rec_books={reccomendedBooks?.rec_books}
          recLoading={loadingRecBooks}
          recError={recError}
        />
        {fetchingBooks && <Loader />}
        {!fetchingBooks && books?.books && <BooksList books={books?.books} />}
      </Container>
      <BookPagination
        pages={books?.pages as number}
        page={books?.page as number}
      />
    </Box>
  );
};

export default Home;
