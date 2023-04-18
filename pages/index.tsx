// Importing Layout from components directory. The Layout contains header, main, and footer
import { NextSeo } from 'next-seo';
import Agoraphobic from 'components/Agoraphobic';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  useEffect(() => { router.replace('/article/page/[pageNumber]', '/article/page/1'); }, [router]);

  return (
    <div className='container'>
      <NextSeo />
      <Agoraphobic>Loading</Agoraphobic>
    </div>
  );
};

export default Home;
