import React, { useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Box, useMediaQuery } from '@mui/material';


const PostEditor = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);

  return (
    <Box>

      <Editor
        ref={editorRef}
        theme={prefersDarkMode ? 'dark' : ''}
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
