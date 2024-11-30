'use client';
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
export function PostBlog() {
  const { trigger, isMutating } = useSWRMutation(`/api/post`, fetchPostBlog);

  return {
    postBlogTrigger: trigger,
    postBlogIsMutating: isMutating,
  };
}

async function fetchPutBlog(url, { arg }: { arg: DBPost }) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(arg),
  }).then((result) => result.json());

  return res;
}
/**
 * PUT - PutBlog
 */
export function PutBlog(pid: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/post/${pid}`,
    fetchPutBlog,
  );

  return {
    putBlogTrigger: trigger,
    putBlogIsMutating: isMutating,
  };
}
