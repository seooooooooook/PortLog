import Head from 'next/head';
import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import { getServerSession, Session } from 'next-auth';
import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { ChipsArray } from 'components/Atom';
import { authOption } from '../../api/auth/[...nextauth]';
import { useRouter } from 'next/router';

interface profileDB {
  id: number;
  phone: string;
  job: string;
  userId: string;
  skill: { key: number; skill: string; profileId: number }[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOption);
  const username = context?.params?.username as string;

  const user = await prisma.user.findUnique({
    where: {
      id: username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  const profile: profileDB = await prisma.profile.findUnique({
    where: {
      userId: username,
    },
    include: {
      skill: true,
    },
  });

  return {
    props: {
      username: user.name,
      image: user.image,
      session: session,
      profile: profile,
    },
  };
}

const Index = (props: {
  session: Session;
  username;
  image;
  profile: profileDB;
}) => {
  const { session, username, profile, image } = props;
  const router = useRouter();

  return (
    <BaseLayoutsWithSession session={session} username={username}>
      <Container>
        <Head>
          <title>{`${username}'S PORT | 프로필`}</title>
          <meta
            name="description"
            content={`${username}의 프로필을 제공합니다.`}
          />
        </Head>
        <Box component="main" sx={{ display: 'flex', gap: '50px' }}>
          <Box
            component="section"
            sx={{
              padding: '16px 22px',
              bgcolor: 'primary.dark',
              flex: '1 1 30%',
              gap: '23px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
            }}
          >
            {image ? (
              <Avatar
                alt="프로필 사진"
                src={image}
                sx={{ width: 300, height: 300 }}
              />
            ) : (
              <Avatar alt="프로필 사진" sx={{ width: 300, height: 300 }}>
                {router.query.username}
              </Avatar>
            )}
            <Typography variant="h5">{username}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile.job}
            </Typography>
          </Box>
          <Box component="section">
            <Paper
              elevation={2}
              component="section"
              sx={{ flex: '1 1 60%', padding: '20px', bgcolor: 'primary.main' }}
            >
              <Typography variant="h6">Tech Stack</Typography>
              <ChipsArray skills={profile.skill}></ChipsArray>
            </Paper>
          </Box>
        </Box>
      </Container>
    </BaseLayoutsWithSession>
  );
};

export default Index;
