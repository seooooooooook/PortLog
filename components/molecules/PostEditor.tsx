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
import { PostBlog } from '../../api-conn/write';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import useSWRMutation from 'swr/mutation';

const PostEditor = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);
  const { data, status } = useSession();
  const { trigger, isMutating } = PostBlog(data.user.id);

  console.log(data, status);

  const showContent = async () => {
    const editorIns = editorRef.current.getInstance();
    // const HTML = editorIns.getMarkdown()
    const content = editorIns.getHTML();
    // console.log('html', HTML)
    console.log('title', title);
    console.log('content', content);
    const imageSize = 'style="max-width:20%"';
    const position = content.indexOf('src');

    const output = [
      content.slice(0, position),
      imageSize,
      content.slice(position),
    ].join('');
    console.log('output', content);
    // 작성글 서버로 보내기
    try{
      const res = await trigger({
        title: title,
        content: content,
      });
      console.log(res)
    }catch (e) {
      console.error(e)
    }
    // try {
    //   const postContent = await apiInstance.post('/community/content', {
    //     userIdx: userIdx,
    //     title: title,
    //     content: output,
    //     file: image,
    //   });
    //   router.replace('/');
    // } catch (e) {
    //   console.error(e.response);
    // }
  };

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
  }

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
          <Button onClick={showContent} fullWidth variant="contained">
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
