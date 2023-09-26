import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth';
import { authOption } from 'pages/api/auth/[...nextauth]';
import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { Box, Divider, Fab, Tooltip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
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

  const onClickWrite = () => router.push('/write');

  const datetime = new Date(postData.updatedAt);

  return (
    <BaseLayoutsWithSession session={session} username={username}>
      <>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 'calc(100vh - 100px)',
            borderTop: '1px solid',
            borderColor: 'primary.main',
            display: 'flex',
          }}
        >
          <Head>
            <title>{`${username}S PORT | 블로그`}</title>
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
          <Box
            id="container"
            sx={{
              height: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
              flex: '1',
            }}
          >
            <Box id="contents" sx={{ padding: '50px', width: '100%' }}>
              <Typography
                variant="h4"
                color="primary"
                sx={{ marginBottom: '10px', fontWeight: 'bold' }}
              >
                {postData.title}
              </Typography>
              <Divider />
              <div dangerouslySetInnerHTML={{ __html: postData.content }}></div>
              <Divider />

              <Typography
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
                variant="subtitle1"
                color="grey"
              >
                <Typography
                  variant="subtitle1"
                  component="span"
                  color="primary"
                  sx={{ marginRight: '10px' }}
                >
                  published on
                </Typography>
                {datetime.toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Typography>
            </Box>
          </Box>
          {session.user.id === router.query.username && (
            <Tooltip title="글 작성하기" placement="top" arrow>
              <Fab
                sx={{ position: 'fixed', right: '50px', bottom: '50px' }}
                color="primary"
                aria-label="edit"
              >
                <EditIcon onClick={onClickWrite} />
              </Fab>
            </Tooltip>
          )}
        </Box>
      </>
    </BaseLayoutsWithSession>
  );
};

export default Post;
