import { Rating, Typography } from '@mui/material';
import React from 'react';
import { Book } from '../../types/bookcard';

interface IDescriptionProps {
  book: Book;
}

const Description: React.FC<IDescriptionProps> = ({ book }) => {
  return (
    <>
      <Typography gutterBottom variant="h4">
        {book.bookTitle}
      </Typography>
      <Typography gutterBottom variant="h5">
        {book.bookAuthor}
      </Typography>
      <Typography gutterBottom variant="h6">
        Year of publication: {book.yearOfPublication}
      </Typography>
      <Typography gutterBottom variant="h6">
        Publisher: {book.publisher}
      </Typography>
      <Rating readOnly size="large" value={book.bookRating} precision={0.5} />
    </>
  );
};

export default Description;
