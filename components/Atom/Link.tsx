import React, { ReactNode } from 'react';
import { Button, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { ButtonPropsVariantOverrides } from '@mui/material/Button/Button';
import { OverridableStringUnion } from '@mui/types';

const Link = (props: { href: string; children: ReactNode }) => {
  const { href, children } = props;

  const theme = useTheme();
  const router = useRouter();

  const color =
    router.pathname === href
      ? theme.palette.primary.main
      : theme.palette.text.primary;

  return (
    <Button
      sx={{ color: color, fontSize: '24px' }}
      href={href}
      component="a"
      LinkComponent={NextLink}
    >
      {children}
    </Button>
  );
};

Link.defaultProps = {
  href: '#',
  children: 'default',
};

export default Link;
