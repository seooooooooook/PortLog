'use client';
import useSWR from 'swr';

async function fetchCategoryList(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((result) => result.json());

  return res;
}

/**
 * GET - CategoryList
 */
export function getCategoryList(username?: string) {
  const { data, error, isLoading } = useSWR(
    `/api/category/${username}`,
    fetchCategoryList,
  );

  return {
    categoryList: data,
    error,
    isLoading,
  };
}
