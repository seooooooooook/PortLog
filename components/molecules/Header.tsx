import React from 'react';
import { Box, Button } from '@mui/material';
import { Link } from 'components/Atom';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';
import Logo from 'components/Atom/Logo';
import { User } from 'next-auth';

const Header = (props: { user: User | null }) => {
  const { user } = props;
  const logoutHandler = () => signOut();

  return (
    <Box
      component="nav"
      height="100px"
      sx={{
        width: '100%',
        position: 'sticky',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '30px',
      }}
    >
      <Logo username={user?.name || null} />
      {user ? (
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
          <Link href={`/${user.name}/profile`}>PROFILE</Link>
          <Link href={`/${user.name}/projects`}>PROJECT</Link>
          <Link href={`/${user.name}/blog`}>BLOG</Link>
        </Box>
      ) : null}

      {user ? (
        <Button
          size="large"
          href="/auth/signin"
          component="a"
          LinkComponent={NextLink}
          variant="contained"
          onClick={logoutHandler}
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
