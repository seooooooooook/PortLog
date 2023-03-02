import useSWR from 'swr';

/**
 * 회원가입
 * @param data POST body
 * @param {string} DBUser.id 유저아이디
 * @param {string} DBUser.password 유저비밀번호
 * @param {string} DBUser.name 이름
 * @param {string} DBUser.phone 전화번호
 */
async function fetchPostList(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => result.json());

  return res;
}

export function getPostList(username) {
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
