import useSWR from 'swr';

async function fetchPostList(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => result.json());

  return res;
}

/**
 * GET - PostList
 */
export function getPostList(username: string) {
  const { data, error, isLoading } = useSWR(
    `/api/post/${username}`,
    fetchPostList,
  );

  return {
    postList: data,
    error,
    isLoading,
  };
}
