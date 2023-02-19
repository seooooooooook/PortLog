import Header from 'components/molecules/Header';
import BaseLayoutsWithSession from '../../../components/templates/BaseLayoutsWithSession';
import { Container, Paper } from '@mui/material';
import Head from 'next/head';
import { ChipsArray } from '../../../components/Atom';
import { getServerSession, Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { Masonry } from '@mui/lab';
import { authOption } from '../../api/auth/[...nextauth]';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOption);
  const username = context?.params?.username;

  if (!username) {
    return {
      notFound: true,
    };
  }

  // const data = await fetch(`/api/${username}/profile`)
  //   .then((res) => res.json())
  //   .then((data) => data);

  return {
    props: {
      session: session,
    },
  };
}

const Index = (props: { session: Session }) => {
  const { session } = props;
  return (
    <BaseLayoutsWithSession session={session}>
      <Container>
        <Head>
          <title>PORTLOG | 프로젝트</title>
          <meta name="description" content="SEOK의 프로젝트를 제공합니다." />
        </Head>
        <Masonry columns={4} spacing={2}>
          <Paper>1</Paper>
          <Paper>2</Paper>
          <Paper>3</Paper>
          <Paper>4</Paper>
          <Paper>5</Paper>
          <Paper>6</Paper>
          <Paper>7</Paper>
        </Masonry>
      </Container>
    </BaseLayoutsWithSession>
  );
};

export default Index;
