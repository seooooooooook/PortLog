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
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { auth } from '../../../auth';
import { permanentRedirect } from 'next/navigation';
import { RedirectType } from 'next/dist/client/components/redirect';
import SignUpForm from '../../../components/molecules/SignUpForm';

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
//
async function isAuthenticated() {
  const session = await auth();

  if (session?.user) {
    permanentRedirect('/', RedirectType.replace);
  }
}

export default async function Page() {
  await isAuthenticated();
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
          회원가입
        </Typography>
        <SignUpForm />
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
