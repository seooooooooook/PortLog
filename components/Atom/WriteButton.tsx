'use client';
import React from 'react';
import { Fab, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';

const WriteButton = () => {
  const router = useRouter();
  return (
    <Tooltip title="글 작성하기" placement="top" arrow>
      <Fab
        sx={{ position: 'fixed', right: '50px', bottom: '50px' }}
        color="primary"
        aria-label="edit"
      >
        <EditIcon onClick={() => router.push('/write')} />
      </Fab>
    </Tooltip>
  );
};

export default WriteButton;
