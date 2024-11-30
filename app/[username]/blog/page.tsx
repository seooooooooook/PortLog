import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { Box, Typography } from '@mui/material';
import { auth } from 'auth';
import { router } from 'next/client';
import { permanentRedirect } from 'next/navigation';
import WriteButton from 'components/Atom/WriteButton';

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const session = await getServerSession(context.req, context.res, authOption);
//   const username = context?.params?.username as string;
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
//   const postId = await prisma.category.findFirst({
//     where: {
//       userId: username,
//     },
//     select: {
//       posts: {
//         select: {
//           id: true,
//         },
//       },
//     },
//   });
//
//   if (postId) {
//     return {
//       redirect: {
//         destination: `/${username}/blog/${postId.posts[0].id}`,
//         permanent: true,
//       },
//     };
//   } else {
//     return {
//       props: {
//         session: session,
//         username: user.name,
//       },
//     };
//   }
// }
//

function getUser(userId: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

function getPostId(userId: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.category.findFirst({
    where: {
      userId: userId,
    },
    select: {
      posts: {
        select: {
          id: true,
        },
      },
    },
  });
}

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const session = await auth();
  const username = (await params).username;

  if (!username) {
    return { notFound: true };
  }
  const user = await getUser(username);
  if (!user) {
    return { notFound: true };
  }

  const postId = await getPostId(username);
  if (postId) {
    permanentRedirect(`/${username}/blog/${postId.posts[0].id}`);
  }

  const isOwner: boolean = session?.user?.id === username;
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
          <Box
            id="container"
            sx={{
              height: '100%',
              overflowY: 'scroll',
              overflowX: 'hidden',
              flex: '1',
            }}
          >
            <Box
              id="contents"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Typography align="center" variant="h2">
                아직 작성된 글이 없어요!
              </Typography>
            </Box>
          </Box>
          {isOwner && <WriteButton />}
        </Box>
      </>
    </BaseLayoutsWithSession>
  );
};

export default Page;
//
// const Blog = (props: { session: Session; username: string; postList }) => {
//   const { session, username, postList } = props;
//
//   const data = JSON.parse(postList);
//   const [open, setOpen] = useState(true);
//   const [content, setContent] = useState<any>({
//     title: '',
//     content: '',
//     updatedAt: '',
//   });
//
//   const handleClick = () => {
//     setOpen(!open);
//   };
//
//   const onClickFetch = async (postId: number) => {
//     const { post } = await getPost(postId);
//     setContent({ ...content, ...post });
//   };
//
//   return (
//     <BaseLayoutsWithSession session={session} username={username}>
//       <>
//         <Box
//           sx={{
//             width: '100%',
//             height: 'calc(100vh - 100px)',
//             borderTop: '1px solid',
//             borderColor: 'primary.main',
//             display: 'flex',
//           }}
//         >
//           <Head>
//             <title>PORTLOG | 블로그</title>
//             <meta name="description" content="SEOK의 프로필을 제공합니다." />
//           </Head>
//           <Box sx={{ padding: '35px', flex: '0 1 240px' }}>
//             {data.map((e) => {
//               return (
//                 <Fragment key={e.id}>
//                   <ListItemButton onClick={handleClick}>
//                     <ListItemIcon>
//                       <Dot />
//                     </ListItemIcon>
//                     <ListItemText sx={{ flex: 1 }}>{e.name}</ListItemText>
//                     {open ? <ExpandLess /> : <ExpandMore />}
//                   </ListItemButton>
//                   <Collapse in={open} timeout="auto" unmountOnExit>
//                     {e.posts.map((el) => {
//                       return (
//                         <List component="div" disablePadding key={el.id}>
//                           <ListItemButton
//                             sx={{ pl: 4 }}
//                             onClick={() => onClickFetch(el.id)}
//                           >
//                             <ListItemIcon>
//                               <ListIco />
//                             </ListItemIcon>
//                             <ListItemText>{el.title}</ListItemText>
//                           </ListItemButton>
//                         </List>
//                       );
//                     })}
//                   </Collapse>
//                 </Fragment>
//               );
//             })}
//           </Box>
//           <Divider
//             flexItem
//             orientation="vertical"
//             sx={{ borderColor: 'primary.main' }}
//           ></Divider>
//           <Box sx={{ padding: '35px', flex: '1' }}>
//             <Typography>{content?.title}</Typography>
//             <Typography>{content?.content}</Typography>
//             <Typography>{content?.updatedAt}</Typography>
//           </Box>
//         </Box>
//       </>
//     </BaseLayoutsWithSession>
//   );
// };
//
// export default Blog;
