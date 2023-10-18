import React from 'react';
import dynamic from 'next/dynamic';
import { EditorProps } from '@toast-ui/react-editor';

const PostEditor = dynamic<EditorProps>(
  () => import('components/molecules/PostEditor'),
  {
    ssr: false,
  },
);

const Write = () => {
  return <PostEditor />;
};

export default Write;
