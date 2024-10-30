import { Box, Typography } from '@mui/material';
import React from 'react';
import Head from 'components/Atom/Head';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';

export const runtime = 'edge';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  return {
    props: {
      session: session,
    },
  };
}

export default function Home(props: { session: Session }) {
  const { session } = props;
  return (
    <BaseLayoutsWithSession session={session}>
      <Box component="aside" sx={{ width: '100%', padding: '100px 100px' }}>
        <Head
          title="Portlog | 메인"
          desc="Portlog provides a simple, customizable, and your own portfolio and blog. Create your own portfolio and blogs"
        />
        <Typography variant="h1" sx={{}}>
          CREATE <br />
          YOUR <br />
          OWN <br />
          <Box
            component="span"
            sx={{ fontSize: '112px', color: 'primary.main' }}
          >
            PORTLOG
          </Box>
        </Typography>
      </Box>
    </BaseLayoutsWithSession>
  );
}
