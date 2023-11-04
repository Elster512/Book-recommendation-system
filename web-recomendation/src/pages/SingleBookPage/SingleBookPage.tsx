import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
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
import {
  useGetRecBooksForBookQuery,
  useGetSingleBookQuery,
} from '../../store/bookApi';
import Loader from '../../components/Layout/Loader';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Colors } from '../../styles';
import Reccomendations from '../../components/Carousel/Reccomendations';

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
    data: rec_books,
    isLoading: recLoading,
    isError: recError,
  } = useGetRecBooksForBookQuery(bookID);
  const {
    data: singleBook,
    isLoading: singleBookLoading,
    isError: singleBookError,
  } = useGetSingleBookQuery(bookID);

  const onClickHandler = () => {
    navigate(-1);
  };

  if (singleBookError) {
    navigate('/', { replace: true });
  }
  if (singleBookLoading) {
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
      <Container maxWidth={false} sx={{ maxWidth: '1300px' }}>
        <Grid2 container spacing={2} sx={{ mt: '20px', mb: '20px' }}>
          <Grid2 xs={12}>
            <Button
              onClick={onClickHandler}
              sx={{
                color: 'white',
                width: '100px',
                pl: '0',
                backgroundColor: Colors.hover,
                '&:hover': { backgroundColor: Colors.selected },
              }}
            >
              <ArrowBackIosNewOutlinedIcon sx={{ fontSize: '20px' }} />
              <Typography sx={{ ml: '5px' }}>BACK</Typography>
            </Button>
          </Grid2>
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
                maxWidth: { xs: 'unset', md: '500px' },
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
                BUY
              </Button>
              <Stack>
                <Paper sx={paperStyle}>
                  <LocalShippingOutlinedIcon />
                  <Typography sx={{ ml: '10px', display: 'block' }}>
                    Courier delivery, 180 ₽
                  </Typography>
                </Paper>
                <Paper sx={paperStyle}>
                  <FmdGoodOutlinedIcon />
                  <Typography sx={{ ml: '10px', display: 'block' }}>
                    In a chain store, бесплатно
                  </Typography>
                </Paper>
                <Paper sx={paperStyle}>
                  <LocalShippingOutlinedIcon />
                  <Typography sx={{ ml: '10px', display: 'block' }}>
                    To the pick-up point, 121 ₽
                  </Typography>
                </Paper>
              </Stack>
            </Box>
          </Grid2>
        </Grid2>
        <Reccomendations
          recError={recError}
          recLoading={recLoading}
          rec_books={rec_books?.rec_books}
        />
      </Container>
    </Box>
  );
};

export default SingleBookPage;
