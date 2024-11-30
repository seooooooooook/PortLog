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
import Link from 'next/link';
import KakaoAuthButton from 'components/Atom/KakaoAuthButton';
import LoginForm from 'components/Atom/LoginForm';
import { auth } from 'auth';

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
//
// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOption);
//
//   if (session) {
//     return {
//       props: { session },
//       redirect: {
//         destination: '/',
//         permanent: true,
//       },
//     };
//   }
//
//   return {
//     props: {},
//   };
// }

export default async function Page() {
  return (
    <Container component="main">
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
        <LoginForm>
          <>
            <KakaoAuthButton></KakaoAuthButton>
            <Grid container>
              <Grid item>
                <Link href="/auth/signup">계정이 없습니까? 회원가입</Link>
              </Grid>
            </Grid>
          </>
        </LoginForm>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
