import React from 'react';
import { Book } from '../types/bookcard';
import Grid2 from '@mui/material/Unstable_Grid2';
import BookCard from './BookCard';
interface IBookListProps {
  books: Book[];
}
const BooksList: React.FC<IBookListProps> = ({ books }) => {
  return (
    <Grid2
      container
      rowSpacing={3}
      columnSpacing={5}
      sx={{
        margin: '0 auto',
        maxWidth: { xs: 'min-content', md: '800px', lg: '1300px' },
      }}
    >
      {books.map((book: Book) => (
        <BookCard book={book} key={book.ISBN} />
      ))}
    </Grid2>
  );
};

export default BooksList;
