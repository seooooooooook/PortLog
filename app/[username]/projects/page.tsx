import BaseLayoutsWithSession from 'components/templates/BaseLayoutsWithSession';
import { Container } from '@mui/material';
import { auth } from 'auth';
import { MuiMasonry, Card } from 'components/Atom';
import { notFound } from 'next/navigation';

function getUser(username: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.user.findUnique({
    where: {
      id: username,
    },
  });
}

function getProjects(username: string) {
  if (!prisma) throw new Error('PRISMA NOT DEFINED');
  return prisma.project.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      userId: username,
    },
  });
}

const Page = async ({ params }: { params: Promise<{ username: string }> }) => {
  const session = await auth();
  const username = decodeURIComponent((await params).username);

  if (!username) {
    notFound();
  }
  const user = await getUser(username);
  if (!user) {
    notFound();
  }
  const projectList = await getProjects(username);

  return (
    <BaseLayoutsWithSession session={session} username={user.name}>
      <Container>
        {/*<Head>*/}
        {/*  <title>PORTLOG | 프로젝트</title>*/}
        {/*  <meta name="description" content="SEOK의 프로젝트를 제공합니다." />*/}
        {/*</Head>*/}
        <MuiMasonry columns={4} spacing={2}>
          {projectList.map((el) => (
            <Card {...el} />
          ))}
        </MuiMasonry>
      </Container>
    </BaseLayoutsWithSession>
  );
};

export default Page;
