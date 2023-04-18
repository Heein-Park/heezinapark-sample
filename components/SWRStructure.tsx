import { Fragment } from 'react';
import { NextRouter } from 'next/router';
import Agoraphobic from 'components/Agoraphobic';
import { PropsWithChildren } from 'react';

type Props = {
  isLoading: boolean | undefined;
  error: Error | undefined;
  router: NextRouter;
};

const SWRStructure = (props: PropsWithChildren<Props>) => {
  const { error, isLoading, children, router } = props;

  if (error) {
    router.replace('/404');
    return (
      <style jsx>
        {
          'div {position: absolute;background: white;width: 100%;height: 100%;top:0;left:0;}'
        }
      </style>
    );
  }

  if (isLoading) return <Agoraphobic>Loading</Agoraphobic>;
  else {
    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
};

export default SWRStructure;
