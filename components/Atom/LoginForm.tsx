'use client';
import React, { useMemo, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { signIn } from 'next-auth/react';

const LoginForm = (props: { children: React.ReactElement }) => {
  const { children } = props;
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');

  const isEnable = useMemo(() => id === '' || pw === '', [id, pw]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id !== '' && pw !== '') {
      const result = await signIn('credentials', {
        redirectTo: '/',
        id: id,
        password: pw,
      });
    }
  };
  return (
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
      {children}
    </Box>
  );
};

export default LoginForm;
