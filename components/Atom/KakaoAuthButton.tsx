import React from 'react';
import KakaoIco from 'images/kakao_ico.svg';
import { Box, IconButton, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';

const KakaoAuthButton = () => {
  return (
    <Box>
      <IconButton
        onClick={() => signIn('kakao')}
        sx={{
          width: '100%',
          position: 'relative',
          backgroundColor: '#fee500',
          borderRadius: '6px',
          display: 'flex',
          justifyContent: 'center',
          padding: '6px 16px',
          marginBottom: '16px',
        }}
      >
        <KakaoIco
          width={24}
          height={24}
          style={{
            position: 'absolute',
            left: '30px',
            transform: 'translate(-50%, 20%)',
          }}
        />
        <Typography
          fontWeight="bold"
          variant="subtitle1"
          color="#191919"
          fontSize="60%"
        >
          카카오 계정으로 로그인
        </Typography>
      </IconButton>
    </Box>
  );
};

export default KakaoAuthButton;
