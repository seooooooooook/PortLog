'use client';
import React from 'react';
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';

interface CardProps {
  pid: number;
  title: string;
  desc: string;
  updatedAt: Date;
  url: string;
  image: string | null;
  userId: string;
}

const Card = (props: CardProps) => {
  const date = new Date(props.updatedAt);
  const onClickURL = (url: string) => open(url, '_blank');

  return (
    <MuiCard key={props.pid} onClick={() => onClickURL(props.url)}>
      <CardHeader
        title={props.title}
        subheader={date.toLocaleDateString('ko-KR')}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.image ?? ''}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.desc}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
