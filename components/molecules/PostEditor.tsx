import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight'; 노드 버전 충돌

import {
  Box,
  TextField,
  useMediaQuery,
  Unstable_Grid2 as Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
} from '@mui/material';
import { useRouter } from 'next/router';
import { PostBlog, PutBlog } from '../../api-conn/write';
import { useSession } from 'next-auth/react';
import { getCategoryList } from '../../api-conn/category';
import { GetPost } from '../../api-conn/blog';

const PostEditor = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const router = useRouter();
  const pid = router.query.pid;

  const { post, isPostLoading } = GetPost(() =>
    pid !== undefined ? `/api/post/${pid}` : null,
  );

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const editorRef = useRef(null);
  const { data, status } = useSession();
  const { categoryList, error, isLoading } = getCategoryList(data.user.id);
  const { putBlogTrigger, putBlogIsMutating } = PutBlog(pid as string);
  const { postBlogTrigger, postBlogIsMutating } = PostBlog();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const showContent = async () => {
    const editorIns = editorRef.current.getInstance();
    const content = editorIns.getHTML();
    if (pid) {
      try {
        const res = await putBlogTrigger({
          categoryId: Number(category),
          title: title,
          content: content,
        });
        await router.replace(`/${data.user.id}/blog/${res.pid}`);
      } catch (e) {
        console.error(e);
      }
    } else {
      try {
        const res = await postBlogTrigger({
          categoryId: Number(category),
          title: title,
          content: content,
        });
        await router.replace(`/${data.user.id}/blog/${res.pid}`);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    if (post) {
      setTitle(post.content.title);
      setCategory(post.content.categoryId);
    }
  }, [isPostLoading]);

  if (status === 'unauthenticated') {
    router.push('/auth/signin');
  }

  if (isPostLoading) return <div>loading</div>;

  return (
    <Box sx={{ padding: '10px' }}>
      <Grid container spacing={2}>
        <Grid xs={8}>
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
        <Grid xs={4}>
          <FormControl fullWidth required size="small">
            <InputLabel id="select-label">카테고리</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={category}
              label="카테고리"
              onChange={handleChange}
            >
              {categoryList?.data.map((e) => (
                <MenuItem key={e.id} value={e.id}>
                  {e.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12}>
          <Editor
            ref={editorRef}
            theme={'dark'}
            height="auto"
            language="ko-KR"
            previewStyle="vertical"
            initialEditType="markdown"
            placeholder="글을 작성하세요"
            initialValue={(!isPostLoading && post.content.content) || ''}
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
