import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'components/Atom';
import NextLink from 'next/link';

const Header = () => {
  return (
    <Box
      component="nav"
      height="100px"
      sx={{
        width: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '30px',
      }}
    >
      <Button
        sx={{ fontSize: '36px' }}
        href="/"
        component="a"
        LinkComponent={NextLink}
      >
        SEOK'S PORT
      </Button>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          gap: '9px',
        }}
      >
        <Link href="/profile">PROFILE</Link>
        <Link href="/projects">PROJECT</Link>
        <Link href="/blog">BLOG</Link>
      </Box>
      <Button size="large" variant="contained">
        로그인
      </Button>
    </Box>
  );
};

export default Header;
