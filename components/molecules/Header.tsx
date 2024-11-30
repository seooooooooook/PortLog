'use client';
import React from 'react';
import { Brightness4 } from '@mui/icons-material';
import { Avatar, Box, Button, ToggleButton } from '@mui/material';
import { Link } from 'components/Atom';
import NextLink from 'next/link';
import { signOut } from 'next-auth/react';
import Logo from 'components/Atom/Logo';
import { User } from 'next-auth';
import { useParams } from 'next/navigation';
import { useThemeStore } from 'store/provider';
import { useRouter } from 'next/navigation';

const Header = (props: { user: User | null; username?: string }) => {
  const { user, username } = props;
  // todo: header props로 username 받아서 로고에 박아넣기
  const params = useParams();
  const { isDarkMode, setTheme } = useThemeStore((state) => state);

  const userId = params?.username as string;
  const isEditable = userId === user?.name;
  const logoutHandler = () => signOut();
  const router = useRouter();

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
      <Logo username={username || null} />
      {userId ? (
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
          <Link href={`/${userId}/profile`}>PROFILE</Link>
          <Link href={`/${userId}/projects`}>PROJECT</Link>
          <Link href={`/${userId}/blog`}>BLOG</Link>
        </Box>
      ) : null}

      {user ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <ToggleButton
            value="check"
            selected={isDarkMode}
            onChange={() => setTheme(!isDarkMode)}
          >
            <Brightness4 />
          </ToggleButton>
          <Avatar
            onClick={() => router.push(`/${user.id}/profile`)}
            src={user.image ?? undefined}
          />
          <Button
            size="large"
            component="a"
            LinkComponent={NextLink}
            variant="contained"
            onClick={logoutHandler}
          >
            로그아웃
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <ToggleButton
            value="check"
            selected={isDarkMode}
            onChange={() => setTheme(!isDarkMode)}
          >
            <Brightness4 />
          </ToggleButton>
          <Button
            size="large"
            href="/auth/signin"
            component="a"
            LinkComponent={NextLink}
            variant="contained"
          >
            로그인
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
