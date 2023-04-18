// React API
import { Fragment, useState, useEffect, PropsWithChildren } from 'react';

// Next API
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

// Fetcher APIs
import sanityClient from 'lib/sanity';
import useSWR from 'swr';
import { groq } from 'next-sanity';

// Components
import Layout from 'components/Layout';
import SWRStructure from 'components/SWRStructure';
import Pagination from 'components/Pagination';
import ListItem from 'components/ListItem';
import Separator from 'components/Separator';
import { NextSeo } from 'next-seo';

type Props = {
  pageNumber: number;
};

const Page = ({ pageNumber }: PropsWithChildren<Props>): JSX.Element => {
  const articleNum: string = process.env.articleNum || '1';
  const numberToDisplay = parseInt(articleNum);

  // Router
  const router = useRouter();

  const [articleIds, setArticleIds] = useState([]);
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState<number | undefined>(undefined);
  const [end, setEnd] = useState<number | undefined>(undefined);

  const { data, error, isLoading } = useSWR(
    () => {
      if (start !== undefined && end !== undefined)
        return `{"ids":*[_type == "article"] | order(_createdAt desc) | order(id desc)[${start}...${end}].id, "article_count":count(*[_type == "article"])}`;
      else return null;
    },
    (query) => sanityClient.fetch(groq`${query}`)
  );

  useEffect(() => {
    if (pageNumber) {
      const pageIndex = pageNumber - 1;

      const startIdx = pageIndex * numberToDisplay;
      const endIdx = startIdx + numberToDisplay;
      setStart(startIdx);
      setEnd(endIdx);
    }

    return () => {
      setStart(undefined);
      setEnd(undefined);
    };
  }, [numberToDisplay, pageNumber]);

  useEffect(() => {
    if (data) {
      const { ids, article_count } = data;
      const pageTotalCount = Math.ceil(article_count / numberToDisplay);

      setArticleIds(ids);
      setTotal(pageTotalCount);
    }

    return () => {
      setArticleIds([]);
      setTotal(0);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <Layout>
      <NextSeo noindex />
      <SWRStructure
        isLoading={isLoading || data === undefined}
        error={error}
        router={router}
      >
        {articleIds.length > 0 ? (
          articleIds.map((id, index, { length }) => {
            return (
              <Fragment key={`articleFragment-${index}`}>
                <ListItem id={id} />
                {index !== length - 1 ? <Separator /> : <></>}
              </Fragment>
            );
          })
        ) : (
          <></>
        )}
        <Pagination
          pageTotalCount={total}
          pageNumber={pageNumber}
          basePath="/article/page"
          router={router}
        />
      </SWRStructure>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const object = { ...params };
  const { pageNumber: _pageStr } = object;
  const pageNumber: number | undefined =
    typeof _pageStr === 'string' ? parseInt(_pageStr) : undefined;

  return { props: { pageNumber } };
};

export default Page;
