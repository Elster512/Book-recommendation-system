import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import {
  Container,
  Box,
  Typography,
  Rating,
  Button,
  Stack,
  Paper,
} from '@mui/material';
import { useGetSingleBookQuery } from '../../store/bookApi';
import Loader from '../../components/Layout/Loader';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Colors } from '../../styles';

const paperStyle = {
  border: 'unset',
  boxShadow: 'unset',
  mt: '10px',
  display: 'flex',
  flexWrap: 'nowrap',
};

const SingleBookPage: React.FC = () => {
  const { bookID } = useParams();
  const navigate = useNavigate();
  const {
    data: singleBook,
    isLoading,
    isError,
  } = useGetSingleBookQuery(bookID);
  if (isError) {
    navigate('/', { replace: true });
  }
  if (isLoading) {
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
      <Container>
        <Grid2 container spacing={2} sx={{ mt: '20px' }}>
          <Grid2 xs={12} md={6}>
            <Box
              component="img"
              sx={{
                m: '0 auto',
                boxShadow: 3,
                borderRadius: '10px',
                display: 'block',
                minHeight: '400px',

                maxHeight: '500px',
                maxWidth: 'min-content',
                objectFit: 'contain',
              }}
              src={singleBook?.book.imageUrlL}
              alt={singleBook?.book.bookTitle}
            />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <Typography gutterBottom variant="h4">
              {singleBook?.book.bookTitle}
            </Typography>
            <Typography gutterBottom variant="h5">
              {singleBook?.book.bookAuthor}
            </Typography>
            <Typography gutterBottom variant="h6">
              Year of publication: {singleBook?.book.yearOfPublication}
            </Typography>
            <Typography gutterBottom variant="h6">
              Publisher: {singleBook?.book.publisher}
            </Typography>
            <Rating
              readOnly
              size="large"
              value={singleBook?.book.bookRating}
              precision={0.5}
            />
            <Box
              sx={{
                boxShadow: 3,
                p: '20px',
                borderRadius: '10px',
                mt: '20px',
              }}
            >
              <Button
                sx={{
                  width: '100%',
                  height: '60px',
                  backgroundColor: Colors.hover,
                  color: 'white',
                  '&.Mui-disabled': {
                    color: '#DCDCDC',
                    cursor: 'not-allowed',
                    pointerEvents: 'unset',
                  },
                  '&:hover': {
                    backgroundColor: Colors.hover,
                  },
                }}
                disabled
              >
                КУПИТЬ
              </Button>
              <Stack>
                <Paper sx={paperStyle}>
                  <LocalShippingOutlinedIcon />
                  <Typography sx={{ ml: '10px', display: 'block' }}>
                    Доставка курьером, 180 ₽
                  </Typography>
                </Paper>
                <Paper sx={paperStyle}>
                  <FmdGoodOutlinedIcon />
                  <Typography sx={{ ml: '10px', display: 'block' }}>
                    Доставка курьером, бесплатно
                  </Typography>
                </Paper>
                <Paper sx={paperStyle}>
                  <LocalShippingOutlinedIcon />
                  <Typography sx={{ ml: '10px', display: 'block' }}>
                    В пункт выдаче, 121 ₽
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default SingleBookPage;
