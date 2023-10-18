import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';

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
    `/api/category/${username}/posts`,
    fetchPostList,
  );

  return {
    postList: data,
    error,
    isLoading,
  };
}

async function fetchPost(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => result.json());

  return res;
}

/**
 * GET - Post
 */
export function GetPost(key) {
  const { data, error, isLoading } = useSWR(key, fetchPost);

  return {
    post: data,
    error,
    isPostLoading: isLoading,
  };
}

async function fetchDelPost(url) {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => result.json());

  return res;
}
/**
 * DELETE - Post
 */
export function DelPost(pid: string) {
  const { trigger, isMutating } = useSWRMutation(
    `/api/post/${pid}`,
    fetchDelPost,
  );

  return { trigger, isMutating };
}
