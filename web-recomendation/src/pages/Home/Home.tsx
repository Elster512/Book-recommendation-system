import React, { useEffect } from 'react';
import { Container, Box } from '@mui/material';

import { useGetBooksQuery } from '../../store/bookApi';

import BookPagination from '../../components/BookPagination';
import { useSearchParams } from 'react-router-dom';
import { pageChecker } from '../../helpers/ParamsChecker';
import Reccomendations from '../../components/Reccomendations';
import Loader from '../../components/Loader';
import BooksList from '../../components/BooksList';

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: books,
    isError,
    isLoading: loadBooks,
    isFetching: fetchbooks,
  } = useGetBooksQuery(searchParams.get('page') || '1');
  console.log(fetchbooks);

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
    return <Loader />;
  }

  return (
    <Box>
      <Container
        maxWidth={false}
        sx={{
          mt: '50px',
          maxWidth: '1600px',
          minHeight: '400px',
          position: 'relative',
        }}
      >
        <Reccomendations />
        {fetchbooks && <Loader />}
        {!fetchbooks && books?.books && <BooksList books={books?.books} />}
      </Container>
      <BookPagination
        pages={books?.pages as number}
        page={books?.page as number}
      />
    </Box>
  );
};

export default Home;
