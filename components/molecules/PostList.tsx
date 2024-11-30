'use client';
import { Box, Skeleton } from '@mui/material';
import { getPostList } from '../../api-conn/blog';
import { ListItem } from '../Atom';

const PostList = (props: { userId: string }) => {
  const { userId } = props;
  const { postList, error, isLoading } = getPostList(userId);

  if (error) return <h1>404 ERROR</h1>;

  if (isLoading)
    return (
      <Box>
        <Skeleton variant="rounded" width="1rem" height="1rem" />
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        <Skeleton variant="rectangular" height={30}></Skeleton>
      </Box>
    );

  if (postList.data.length === 0) return <h1>500 ERROR</h1>;

  return postList.data.map((e) => <ListItem key={e.id} data={e}></ListItem>);
};

export default PostList;
