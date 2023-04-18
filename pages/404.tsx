import Agoraphobic from 'components/Agoraphobic';
import { NextSeo } from 'next-seo';

const ErrorPage404 = () => {
  return (
    <div className="container">
      <NextSeo title="404 Not Found" noindex={true} />
      <Agoraphobic mode="trembling" />
    </div>
  );
};

export default ErrorPage404;
