import { NextRouter } from 'next/router';
import { PropsWithChildren } from 'react';

type Props = {
  pageTotalCount: number;
  pageNumber: number;
  basePath: string;
  router: NextRouter;
};

const Pager = ({
  callback,
  children,
}: PropsWithChildren<{ callback: () => void }>): JSX.Element => {
  return (
    <button className="pager__item" onClick={callback}>
      {children}
    </button>
  );
};

const Pagination = ({
  pageTotalCount,
  pageNumber,
  basePath,
  router,
}: PropsWithChildren<Props>) => {
  const PagerPrev = (): JSX.Element => (
    <Pager
      callback={() => {
        router.push(`${basePath}/${pageNumber - 1}`);
      }}
    >
      {'<<'}
    </Pager>
  );

  const PagerNext = (): JSX.Element => (
    <Pager
      callback={() => {
        router.push(`${basePath}/${pageNumber + 1}`);
      }}
    >
      {'>>'}
    </Pager>
  );

  if (pageTotalCount > 0) {
    return (
      <nav className="pager">
        <section className="pager__group__before pager__group__side">
          {pageNumber === 1 ? <></> : <PagerPrev />}
        </section>
        <section className="pager__group__middle" />
        <section className="pager__group__after pager__group__side">
          {pageNumber === pageTotalCount ? <></> : <PagerNext />}
        </section>
      </nav>
    );
  } else {
    return <></>;
  }
};

export default Pagination;
