import React, { ChangeEvent, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'; 노드 버전 충돌

import {
  Box,
  TextField,
  useMediaQuery,
  Unstable_Grid2 as Grid,
  Button,
} from '@mui/material';
import { useRouter } from 'next/router';

const PostEditor = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);

  return (
    <Box sx={{ padding: '10px' }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <TextField
            fullWidth
            required
            size="small"
            value={title}
            label="제목"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setTitle(event.target.value)
            }
            placeholder="제목을 입력하세요."
          />
        </Grid>
        <Grid xs={12}>
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
        </Grid>
        <Grid xs={8}></Grid>
        <Grid xs={2}>
          <Button fullWidth variant="contained">
            저장
          </Button>
        </Grid>
        <Grid xs={2}>
          <Button
            onClick={() => router.replace('../')}
            fullWidth
            variant="outlined"
          >
            취소
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostEditor;
