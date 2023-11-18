import React from 'react';

import { Container, Pagination, PaginationItem } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { Colors } from '../../../Colors/Colors';
interface IBookPaginationProps {
  pages: number;
  page: number;
}

const BookPagination: React.FC<IBookPaginationProps> = ({ pages, page }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: '1480px',
        width: { xs: '100%', lg: '95%' },
        display: 'flex',
        justifyContent: { xs: 'center', lg: 'flex-end' },
        p: '20px  0 30px 0',
      }}
    >
      <Pagination
        size="large"
        page={page || 1}
        count={pages}
        renderItem={(item) => (
          <PaginationItem
            sx={{
              '&:active': {
                backgroundColor: Colors.hover,
              },
              '&.Mui-selected:hover': {
                backgroundColor: Colors.hover,
              },
              '&.Mui-selected': {
                backgroundColor: Colors.hover,
              },
              '&:hover': {
                backgroundColor: Colors.selected,
              },
            }}
            component={Link}
            to={`/?page=${item.page}${query && `&query=${query}`}`}
            {...item}
          />
        )}
      />
    </Container>
  );
};

export default BookPagination;
