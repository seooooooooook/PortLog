import React, { useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { EditorProps } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { Box } from '@mui/material';

const WysiwygEditor = dynamic<EditorProps>(
  () => import('@toast-ui/react-editor').then((o) => o.Editor),
  {
    ssr: false,
  },
);

const PostEditor = () => {
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);

  return (
    <Box>
      <WysiwygEditor
        ref={editorRef}
        height="auto"
        language="ko-KR"
        previewStyle="vertical"
        initialEditType="markdown"
        placeholder="글을 작성하세요"
        initialValue=""
        useCommandShortcut={true}
      />
    </Box>
  );
};

export default PostEditor;
