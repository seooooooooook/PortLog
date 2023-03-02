import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
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

  const postId = await prisma.category.findFirst({
    where: {
      userId: username,
    },
    select: {
      posts: {
        select: {
          id: true,
        },
      },
    },
  });

  return {
    redirect: {
      destination: `/${username}/blog/${postId.posts[0].id}`,
      permanent: true,
    },
  };
}

const Index = () => {
  return <div></div>;
};

export default Index;
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
