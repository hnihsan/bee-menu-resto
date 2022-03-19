import Head from "next/head";
import Header from "@parts/Header";

const Default = ({ children }) => {
  return (
    <>
      <Head>
        <title>Nectars - Restaurant Menu Creator</title>
        <link rel="shortcut icon" href="/images/ethersphere.png" />
      </Head>
      <main>
        <Header />
        {children}
      </main>
    </>
  );
};
export default Default;
