import { Container, Typography } from '@mui/material';
import React from 'react';

import Loader from './Loader';
import { useGetRecBooksQuery } from '../store/bookApi';

const Reccomendations: React.FC = () => {
  const {
    data: reccomendedBooks,
    isError: recError,
    isFetching: fetchingRecBooks,
  } = useGetRecBooksQuery();
  if (recError) {
    return (
      <Container>
        <Typography variant="h5">NOT FOUND</Typography>
      </Container>
    );
  }
  return (
    <Container
      sx={{
        position: 'relative',
        minHeight: '200px',
      }}
    >
      {fetchingRecBooks && <Loader />}
    </Container>
  );
};

export default Reccomendations;
