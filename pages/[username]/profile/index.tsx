import Head from 'next/head';
import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { ChipsArray } from 'components/Atom';
import { authOption } from '../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOption);
  const username = context?.params?.username;
  console.log(session);

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

const Index = (props: { session: Session }) => {
  const { session } = props;
  const router = useRouter();

  console.log(router.query.username);
  return (
    <BaseLayoutsWithSession session={session}>
      <Container>
        <Head>
          <title>PORTLOG | 프로필</title>
          <meta name="description" content="SEOK의 프로필을 제공합니다." />
        </Head>
        <Box component="main" sx={{ display: 'flex', gap: '50px' }}>
          <Box
            component="section"
            sx={{
              padding: '16px 22px',
              bgcolor: 'primary.light',
              flex: '1 1 30%',
              gap: '23px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
            }}
          >
            {session?.user?.image ? (
              <Avatar
                alt="프로필 사진"
                src={session.user.image}
                sx={{ width: 300, height: 300 }}
              />
            ) : (
              <Avatar alt="프로필 사진" sx={{ width: 300, height: 300 }}>
                {router.query.username}
              </Avatar>
            )}
            <Typography variant="h5">{session?.user?.name}</Typography>
            <Typography variant="h5">직무</Typography>
          </Box>
          <Box component="section">
            <Paper
              elevation={2}
              component="section"
              sx={{ flex: '1 1 60%', padding: '20px' }}
            >
              <Typography variant="h6">Tech Stack</Typography>
              <ChipsArray></ChipsArray>
            </Paper>
          </Box>
        </Box>
      </Container>
    </BaseLayoutsWithSession>
  );
};

export default Index;
