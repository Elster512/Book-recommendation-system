import { Container, TextField } from '@mui/material';

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchField: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [input, setInput] = useState(query?.trim() || '');
  const timer = useRef<any>();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  useEffect(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setSearchParams({
        page: '1',
        query: input.trim() || '',
      });
    }, 500);
  }, [input, setSearchParams]);

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        mt: '20px',
        mb: '20px',
      }}
    >
      <TextField
        value={input}
        onChange={onChangeHandler}
        sx={{
          minWidth: '300px',
          width: '600px',
        }}
        variant="standard"
        placeholder="Search Something..."
        inputProps={{
          style: {
            borderBottomColor: 'green',
            fontSize: 30,
            padding: '10px',
            textAlign: 'center',
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: 30,
            marginBottom: '0px',
          },
        }}
      />
    </Container>
  );
};

export default SearchField;
