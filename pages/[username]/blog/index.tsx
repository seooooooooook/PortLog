import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';

import { getServerSession, Session } from 'next-auth';
import BaseLayoutsWithSession from '../../../components/templates/BaseLayoutsWithSession';
import { Box, Container } from '@mui/material';
import { authOption } from '../../api/auth/[...nextauth]';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOption);
  const username = context?.params?.username;

  if (!username) {
    return {
      notFound: true,
    };
  }

  // const data = await fetch(`/api/${username}/profile`)
  //   .then((res) => res.json())
  //   .then((data) => data);

  return {
    props: {
      session: session,
    },
  };
}

const Blog = (props: { session: Session }) => {
  const { session } = props;
  return (
    <BaseLayoutsWithSession session={session}>
      <Container>
        <Head>
          <title>PORTLOG | 블로그</title>
          <meta name="description" content="SEOK의 프로필을 제공합니다." />
        </Head>
        <Box component="main" sx={{ display: 'flex' }}>
          <Box component="section" sx={{ bgcolor: 'primary.main', flex: 1 }}>
            프로필
          </Box>
          <Box component="section">stack</Box>
        </Box>
      </Container>
    </BaseLayoutsWithSession>
  );
};

export default Blog;
