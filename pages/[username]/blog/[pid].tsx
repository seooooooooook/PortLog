import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOption } from 'pages/api/auth/[...nextauth]';
import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { Box, Container, Divider, Typography } from '@mui/material';
import Head from 'next/head';
import PostList from 'components/molecules/PostList';
import { useRouter } from 'next/router';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOption);
  const username = context?.params?.username as string;
  const pid = context?.params?.pid;

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

  const content = await prisma.post.findUnique({
    where: {
      id: Number(pid),
    },
  });

  return {
    props: {
      username: user.name,
      session: session,
      post: JSON.stringify(content),
    },
  };
}

const Post = (props) => {
  const { session, username, post } = props;
  const router = useRouter();

  const postData = JSON.parse(post);

  return (
    <BaseLayoutsWithSession session={session} username={username}>
      <>
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 100px)',
            borderTop: '1px solid',
            borderColor: 'primary.main',
            display: 'flex',
          }}
        >
          <Head>
            <title>{username}'S PORT | 블로그</title>
            <meta name="description" content={`${username}의 기술 블로그에`} />
          </Head>
          <Box sx={{ padding: '35px', flex: '0 1 240px' }}>
            <PostList userId={router.query.username as string}></PostList>
          </Box>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ borderColor: 'primary.main' }}
          ></Divider>
          <Container sx={{height: '100%', overflow : 'scroll'}}>
            <Box sx={{ padding: '35px', flex: '1' }}>
              <Typography variant="h4" sx={{ marginBottom: '10px' }}>
                {postData.title}
              </Typography>
              <Divider />
              <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
              <Typography>{postData.updatedAt}</Typography>
            </Box>
          </Container>
        </Box>
      </>
    </BaseLayoutsWithSession>
  );
};

export default Post;
