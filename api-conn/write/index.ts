import useSWRMutation from 'swr/mutation';

interface DBPost {
  categoryId: number;
  title: string;
  content: string;
}

async function fetchPostBlog(url, { arg }: { arg: DBPost }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  }).then((result) => result.json());

  return res;
}

/**
 * POST - PostBlog
 */
export function PostBlog(username: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/write/${username}`,
    fetchPostBlog,
  );

  return {
    trigger,
    isMutating,
  };
}
