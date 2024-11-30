'use client';
import React, { useMemo, useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { signUp } from 'api-conn/user';
import Link from 'next/link';

const SignUpForm = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [cpw, setCpw] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const isEnable = useMemo(
    () => id === '' || pw === '' || cpw === '' || name === '' || phone === '',
    [id, pw, cpw, name, phone],
  );
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pw !== cpw) {
      alert("Passwords don't match");
    }
    const res = await signUp({
      id: id,
      password: pw,
      name: name,
      phone: phone,
    });
  };
  return (
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
        disabled={isEnable}
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
  );
};

export default SignUpForm;
