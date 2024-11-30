'use client';
import React, { ReactNode } from 'react';
import { Button, useTheme } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

const Link = (props: { href: string; children: ReactNode }) => {
  const { href, children } = props;

  const theme = useTheme();

  const color = usePathname()?.startsWith(href)
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
