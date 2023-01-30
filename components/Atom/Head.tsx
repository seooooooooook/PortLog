import React from 'react';
import NextHead from 'next/head';

const Head = (props: { title: string; desc: string }) => {
  const { title, desc } = props;
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="desciption" content={desc} />
    </NextHead>
  );
};

export default Head;
