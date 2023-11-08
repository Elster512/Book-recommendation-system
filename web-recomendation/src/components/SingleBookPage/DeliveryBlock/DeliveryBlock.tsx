import { Box, Button, Paper, Stack, Typography } from '@mui/material';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import React from 'react';
import { Colors } from '../../../Colors/Colors';
const paperStyle = {
  border: 'unset',
  boxShadow: 'unset',
  mt: '10px',
  display: 'flex',
  flexWrap: 'nowrap',
};
const typographyStyle = { ml: '10px', display: 'block' };

const DeliveryBlock: React.FC = () => {
  return (
    <>
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
            <Typography sx={typographyStyle}>
              Courier delivery, 180 ₽
            </Typography>
          </Paper>
          <Paper sx={paperStyle}>
            <FmdGoodOutlinedIcon />
            <Typography sx={typographyStyle}>In a chain store, free</Typography>
          </Paper>
          <Paper sx={paperStyle}>
            <LocalShippingOutlinedIcon />
            <Typography sx={typographyStyle}>
              To the pick-up point, 121 ₽
            </Typography>
          </Paper>
        </Stack>
      </Box>
    </>
  );
};

export default DeliveryBlock;
