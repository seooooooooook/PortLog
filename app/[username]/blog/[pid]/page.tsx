import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { Box, Divider, Typography } from '@mui/material';
import PostList from 'components/molecules/PostList';
import { router } from 'next/client';
import WriteButton from 'components/Atom/WriteButton';
import { auth } from 'auth';
import { PostButton } from 'components/Atom/Button';

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOption);
//   const username = context?.params?.username as string;
//   const pid = context?.params?.pid;
//
//   const user = await prisma.user.findUnique({
//     where: {
//       id: username,
//     },
//   });
//
//   if (!user) {
//     return {
//       notFound: true,
//     };
//   }
//
//   const content = await prisma.post.findUnique({
//     where: {
//       id: Number(pid),
//     },
//   });
//
//   return {
//     props: {
//       username: user.name,
//       session: session,
//       post: JSON.stringify(content),
//     },
//   };
// }

function getUser(userId: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

function getContent(pid: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.post.findUnique({
    where: {
      id: Number(pid),
    },
  });
}

const Page = async ({
  params,
}: {
  params: Promise<{ username: string; pid: string }>;
}) => {
  const session = await auth();
  const { username, pid } = await params;
  if (!username) {
    return { notFound: true };
  }
  const user = await getUser(username);
  if (!user) {
    return { notFound: true };
  }
  const post = await getContent(pid);
  if (!post) {
    return { notFound: true };
  }

  const isOwner: boolean = session?.user.id === username;
  const datetime = new Date(post.updatedAt);
  return (
    <BaseLayoutsWithSession session={session} username={user.name}>
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
          {/*<Head>*/}
          {/*  <title>{`${username}S PORT | 블로그`}</title>*/}
          {/*  <meta name="description" content={`${username}의 기술 블로그에`} />*/}
          {/*</Head>*/}
          <Box sx={{ padding: '35px', flex: '0 1 240px' }}>
            <PostList userId={username}></PostList>
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
                {post.title}
              </Typography>
              <Divider />
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
              <Divider />

              <Typography
                sx={{
                  display: 'flex',
                  margin: '10px 0',
                  justifyContent: 'flex-end',
                }}
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
              {isOwner && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    margin: '10px auto',
                  }}
                >
                  <PostButton type="EDIT" userId={username} pid={pid} />
                  <PostButton type="DELETE" userId={username} pid={pid} />
                </Box>
              )}
            </Box>
          </Box>
          {isOwner && <WriteButton />}
        </Box>
      </>
    </BaseLayoutsWithSession>
  );
};

export default Page;
