import React, { useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorProps } from '@toast-ui/react-editor';

const PostEditor = dynamic<EditorProps>(
  () => import('components/molecules/PostEditor'),
  {
    ssr: false,
  },
);

const Write = () => {
  const [title, setTitle] = useState<string>('');
  const editorRef = useRef(null);

  return <PostEditor />;
};

export default Write;
