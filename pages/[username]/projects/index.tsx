import BaseLayoutsWithSession from '../../../components/templates/BaseLayoutsWithSession';
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { getServerSession, Session } from 'next-auth';
import { GetServerSidePropsContext } from 'next';
import { Masonry } from '@mui/lab';
import { authOption } from '../../api/auth/[...nextauth]';

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

  const projectList = await prisma.project.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      userId: username,
    },
  });

  return {
    props: {
      username: user.name,
      session: session,
      projectList: JSON.stringify(projectList),
    },
  };
}

const Index = (props: { session: Session; username: string; projectList }) => {
  const { session, username, projectList } = props;
  const parsedData = JSON.parse(projectList);
  const onClickURL = (url: string) => open(url, '_blank');

  return (
    <BaseLayoutsWithSession session={session} username={username}>
      <Container>
        <Head>
          <title>PORTLOG | 프로젝트</title>
          <meta name="description" content="SEOK의 프로젝트를 제공합니다." />
        </Head>
        <Masonry columns={4} spacing={2}>
          {parsedData.map((el) => {
            const date = new Date(el.updatedAt);
            return (
              <Card key={el.pid} onClick={() => onClickURL(el.url)}>
                <CardHeader
                  title={el.title}
                  subheader={date.toLocaleDateString('ko-KR')}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={el.image}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {el.desc}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
        </Masonry>
      </Container>
    </BaseLayoutsWithSession>
  );
};

export default Index;
