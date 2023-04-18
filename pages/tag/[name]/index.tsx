import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Agoraphobic from 'components/Agoraphobic';
import { NextSeo } from 'next-seo';

// Tag page component
const Page = () => {
  // Using the useRouter hook to get the name query param from the URL
  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    router.replace('/tag/[name]/[pageNumber]', `/tag/${name}/1`);
  }, [name, router]);

  return (
    <div className="container">
      <NextSeo title="Redirecting" />
      <Agoraphobic>Loading</Agoraphobic>
    </div>
  );
};

export default Page;
