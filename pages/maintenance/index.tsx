// Next API
import { NextSeo } from 'next-seo';

// Components
import Agoraphobic from 'components/Agoraphobic';

const Page = () => {
  return (
    <div className="container">
      <NextSeo title="Maintenance" nofollow noindex />
      <Agoraphobic>
        Apologies for inconvenience <br />
        This website is currently under maintenance
      </Agoraphobic>
    </div>
  );
};

export default Page;
