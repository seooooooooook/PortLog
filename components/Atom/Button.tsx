'use client';
import { Button } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import { DelPost } from 'api-conn/blog';
import { TriggerWithoutArgs } from 'swr/mutation';

type ButtonProps = {
  type: 'EDIT' | 'DELETE';
  pid: string;
  userId: string;
};

export function EditPostButton(props: { pid: string; isMutating: boolean }) {
  const { pid, isMutating } = props;
  const router = useRouter();
  const onClickEdit = () => router.push(`/write?pid=${pid}`);
  return (
    <Button
      size="large"
      variant="contained"
      startIcon={<EditNoteIcon />}
      disabled={isMutating}
      onClick={onClickEdit}
      sx={{ display: 'flex' }}
    >
      수정
    </Button>
  );
}

export function DeletePostButton(props: {
  userId: string;
  isMutating: boolean;
  trigger: TriggerWithoutArgs;
}) {
  const { userId, isMutating, trigger } = props;
  const router = useRouter();
  const onClickDel = async () => {
    await trigger();
    await mutate(`/api/category/${userId}/posts`);
    router.push(`/${userId}/blog`);
  };
  return (
    <Button
      size="large"
      variant="outlined"
      startIcon={<DeleteIcon />}
      disabled={isMutating}
      onClick={onClickDel}
      sx={{ display: 'flex' }}
    >
      삭제
    </Button>
  );
}

export function PostButton(props: ButtonProps) {
  const { type, userId, pid } = props;
  const { trigger, isMutating } = DelPost(pid);

  switch (type) {
    case 'DELETE':
      return (
        <DeletePostButton
          userId={userId}
          isMutating={isMutating}
          trigger={trigger}
        />
      );
    case 'EDIT':
      return <EditPostButton pid={pid} isMutating={isMutating} />;
  }
}
