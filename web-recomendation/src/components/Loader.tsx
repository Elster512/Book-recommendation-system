import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        width: 'min-content',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'transalate(-50%,-50%)',
      }}
    >
      <CircularProgress size="50px" />
    </Box>
  );
};

export default Loader;
