import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import s from './Header.module.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ width: '100%', padding: '10px' }}>
      <Toolbar>
        <Link to="/" className={s['header-link']}>
          <BookIcon sx={{ fontSize: '40px', flexGrow: 0, display: 'flex' }} />
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              fontFamily: 'sans-serif',
              flexGrow: 1,
              textDecoration: 'unset',
            }}
          >
            BookLife.com
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
