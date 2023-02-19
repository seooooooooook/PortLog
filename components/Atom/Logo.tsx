import React from 'react';
import { Button } from '@mui/material';
import NextLink from 'next/link';

const Logo = (props: { username: string | null }) => {
  return (
    <>
      {props.username ? (
        <Button
          sx={{ fontSize: '36px' }}
          href="/"
          component="a"
          LinkComponent={NextLink}
        >
          {props.username}'S PORT
        </Button>
      ) : (
        <Button
          sx={{ fontSize: '36px' }}
          href="/"
          component="a"
          LinkComponent={NextLink}
        >
          PORTLOG
        </Button>
      )}
    </>
  );
};

export default Logo;
