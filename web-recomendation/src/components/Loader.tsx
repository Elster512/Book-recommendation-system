import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack } from '@mui/material';

const Loader: React.FC = () => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: 'inherit' }}
    >
      <CircularProgress
        size="40px"
        sx={{
          width: 'min-content',
        }}
      />
    </Stack>
  );
};

export default Loader;
