import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { ChipsArray } from 'components/Atom';
import { auth } from 'auth';
import { notFound } from 'next/navigation';

interface profileDB {
  id: number;
  phone: string;
  job: string;
  userId: string;
  skill: { key: number; skill: string; profileId: number }[];
}

function getProfile(username: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.profile.findUnique({
    where: {
      userId: username,
    },
    include: {
      skill: true,
    },
  });
}
function getUser(username: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.user.findUnique({
    where: {
      id: username,
    },
  });
}

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const session = await auth();
  const username = decodeURIComponent((await params).username);

  if (!username) {
    notFound();
  }
  const profile = await getProfile(username);
  const user = await getUser(username);

  console.log(user);
  if (!user) {
    notFound();
  }
  const image = user?.image;

  return (
    <BaseLayoutsWithSession session={session} username={user.name}>
      <Container>
        {/*<Head>*/}
        {/*  <title>{`${username}'S PORT | 프로필`}</title>*/}
        {/*  <meta*/}
        {/*    name="description"*/}
        {/*    content={`${username}의 프로필을 제공합니다.`}*/}
        {/*  />*/}
        {/*</Head>*/}
        <Box component="main" sx={{ display: 'flex', gap: '50px' }}>
          <Box
            component="section"
            sx={{
              padding: '16px 22px',
              bgcolor: 'primary.main',
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
                {user.name}
              </Avatar>
            )}
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {profile?.job ?? ''}
            </Typography>
          </Box>
          <Box component="section">
            <Paper
              elevation={2}
              component="section"
              sx={{ flex: '1 1 60%', padding: '20px', bgcolor: 'primary.main' }}
            >
              <Typography variant="h6">Tech Stack</Typography>
              {profile && <ChipsArray skills={profile.skill}></ChipsArray>}
            </Paper>
          </Box>
        </Box>
      </Container>
    </BaseLayoutsWithSession>
  );
};

export default Page;
