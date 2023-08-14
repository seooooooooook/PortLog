import React, { useRef, useState } from 'react';
import { PostEditor } from 'components/Atom';
import BlogPost from '../components/molecules/BlogPost';

const Write = () => {
  const [title, setTitle] = useState<string>('');
  const editorRef = useRef(null);

  return <BlogPost />;
};

export default Write;
