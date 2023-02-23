import React, { ReactElement } from 'react';
import Head from '../Atom/Head';
import { Box, Typography } from '@mui/material';
import Header from '../molecules/Header';
import { Session } from 'next-auth';

const BaseLayoutsWithSession = (props: {
  children: ReactElement;
  session: Session;
  username: string;
}) => {
  const { session, children, username } = props;
  return (
    <>
      <Box component="main" sx={{ position: 'relative' }}>
        <Header user={session?.user || null} username={username}></Header>
        {children}
      </Box>
    </>
  );
};

export default BaseLayoutsWithSession;
