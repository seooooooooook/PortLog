import { Box, Typography } from '@mui/material';

import { GetServerSidePropsContext } from 'next';
import type { Metadata } from 'next';
import { auth } from 'auth';
import BaseLayoutsWithSession from '../components/templates/BaseLayoutsWithSession';
import { Session } from 'next-auth';
// import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';

export const metadata: Metadata = {
  title: 'Portlog | 메인',
  description:
    'Portlog provides a simple, customizable, and your own portfolio and blog. Create your own portfolio and blogs',
};

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getSession({ req: context.req });
//
//   return {
//     props: {
//       session: session,
//     },
//   };
// }

export default async function Page(context: GetServerSidePropsContext) {
  const session = await auth();

  return (
    <BaseLayoutsWithSession session={session}>
      <Box component="aside" sx={{ width: '100%', padding: '100px 100px' }}>
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
