import Header from 'components/molecules/Header';
import Head from 'next/head';

const Index = () => {
  return (
    <main>
      <Head>
        <title>프로필 | SEOK'S PORT</title>
        <meta name="description" content="SEOK의 프로필을 제공합니다." />
      </Head>
      <Header></Header>
    </main>
  );
};

export default Index;
