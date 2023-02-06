import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'components/Atom';
import NextLink from 'next/link';
import { useSession } from 'next-auth/client';

const Header = () => {
  const [session, loading] = useSession();

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
      {session ? (
        <Button
          size="large"
          href="/auth/signin"
          component="a"
          LinkComponent={NextLink}
          variant="contained"
          //todo : 로그아웃 기능 추가
        >
          로그아웃
        </Button>
      ) : (
        <Button
          size="large"
          href="/auth/signin"
          component="a"
          LinkComponent={NextLink}
          variant="contained"
        >
          로그인
        </Button>
      )}
    </Box>
  );
};

export default Header;
