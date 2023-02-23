import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { getServerSession, Session } from 'next-auth';
import BaseLayoutsWithSession from '../../../components/templates/BaseLayoutsWithSession';
import {
  Box,
  Collapse,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { authOption } from '../../api/auth/[...nextauth]';
import Dot from 'images/dot.svg';
import ListIco from 'images/list.svg';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { useState } from 'react';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOption);
  const username = context?.params?.username as string;

  const user = await prisma.user.findUnique({
    where: {
      id: username,
    },
  });

  if (!user) {
    return {
      notFound: true,
    };
  }

  // const data = await fetch(`/api/${username}/profile`)
  //   .then((res) => res.json())
  //   .then((data) => data);

  return {
    props: {
      username: user.name,
      session: session,
    },
  };
}

const Blog = (props: { session: Session; username: string }) => {
  const { session, username } = props;

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const data = [
    {
      name: 'computer Science',
      posts: [
        {
          id: 1,
          title: '네트워크 개요',
          content: 'Stringsdfsldfjasdlfs',
          updatedAt: '2020-02-29',
        },
      ],
    },
  ];

  return (
    <BaseLayoutsWithSession session={session} username={username}>
      <>
        <Box
          sx={{
            width: '100%',
            height: 'calc(100vh - 100px)',
            borderTop: '1px solid',
            borderColor: 'primary.main',
            display: 'flex',
          }}
        >
          <Head>
            <title>PORTLOG | 블로그</title>
            <meta name="description" content="SEOK의 프로필을 제공합니다." />
          </Head>
          <Box sx={{ padding: '35px', flex: '0 1 240px' }}>
            {data.map((e) => {
              return (
                <>
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <Dot />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon>
                          <ListIco />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </>
              );
            })}
          </Box>
          <Divider
            flexItem
            orientation="vertical"
            sx={{ borderColor: 'primary.main' }}
          ></Divider>
          <Box sx={{ padding: '35px', flex: '1' }}>content</Box>
        </Box>
      </>
    </BaseLayoutsWithSession>
  );
};

export default Blog;
