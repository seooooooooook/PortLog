import useSWR from 'swr';

async function fetchPostBlog(url) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => result.json());

  return res;
}

/**
 * GET - PostList
 */
export function PostBlog(username) {
  const { data, error, isLoading } = useSWR(
    `/api/write/${username}`,
    fetchPostBlog,
  );

  return {
    postList: data,
    error,
    isLoading,
  };
}
