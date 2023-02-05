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
import { useState } from 'react';
import { signUp } from 'api-conn/user';

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

export default function SignUp() {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [cpw, setCpw] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pw !== cpw) {
    }
    const res = await signUp({
      id: id,
      password: pw,
      name: name,
      phone: phone,
    });
    console.log(res);
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
          회원가입
        </Typography>
        <Box
          component="form"
          noValidate
          method="POST"
          onSubmit={handleSubmit}
          sx={{ mt: 1, maxWidth: '450px' }}
        >
          <TextField
            margin="normal"
            autoComplete="username"
            name="아이디"
            required
            fullWidth
            id="username"
            label="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            type="password"
            label="비밀번호"
            name="password"
            autoComplete="new-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="current-password"
            value={cpw}
            onChange={(e) => setCpw(e.target.value)}
            type="password"
            error={pw !== cpw}
            label="비밀번호 확인"
            name="password"
            autoComplete="current-password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="cc-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="이름"
            name="cc-name"
            autoComplete="cc-name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            label="연락처"
            name="tel"
            autoComplete="tel-national"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            회원가입
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/signin">이미 계정이 존재합니까? 로그인</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}
