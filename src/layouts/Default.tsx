import Head from 'next/head';
import Header from '@parts/Header';

const Default = ({ children }) => {
  return (
    <>
      <Head>
        <title>Bee Cafe</title>
      </Head>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
};
export default Default;
