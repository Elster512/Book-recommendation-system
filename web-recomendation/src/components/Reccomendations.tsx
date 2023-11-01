import { Container, Typography } from '@mui/material';
import React from 'react';

import Loader from './Layout/Loader';
import { Book } from '../types/bookcard';
import BooksCarousel from './Carousel/BooksCarousel';
interface IReccomendationsProps {
  rec_books: Book[] | undefined;
  recError: boolean;
  recLoading: boolean;
}

const Reccomendations: React.FC<IReccomendationsProps> = ({
  recError,
  rec_books,
  recLoading,
}) => {
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
        minHeight: '340px',
      }}
    >
      <Typography variant="h5">Похоже на то,что вы читаете</Typography>
      {recLoading && <Loader />}
      {!recLoading && rec_books && <BooksCarousel books={rec_books} />}
    </Container>
  );
};

export default Reccomendations;
