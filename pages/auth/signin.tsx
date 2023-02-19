import * as React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
//클라이언트 로그인 요청
import { getSession, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import KakaoAuthButton from 'components/Atom/KakaoAuthButton';
import { getServerSession } from 'next-auth';
import { authOption } from '../api/auth/[...nextauth]';
import { GetServerSidePropsContext } from 'next';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link href="/">Your Website</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOption);

  if (session) {
    return {
      props: { session },
      redirect: {
        destination: '/',
        permanent: true,
      },
    };
  }

  return {
    props: {},
  };
}

export default function SignIn() {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const isEnable = useMemo(() => id === '' || pw === '', [id, pw]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id !== '' && pw !== '') {
      const result = await signIn('credentials', {
        redirect: false,
        id: id,
        password: pw,
      });

      if (!result?.error) {
        router.replace('/');
      }
    }
  };

  return (
    <Container component="main">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isEnable}
            sx={{ mt: 3, mb: 2 }}
          >
            로그인
          </Button>
          <KakaoAuthButton></KakaoAuthButton>
          <Grid container>
            <Grid item>
              <Link href="/auth/signup">계정이 없습니까? 회원가입</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
