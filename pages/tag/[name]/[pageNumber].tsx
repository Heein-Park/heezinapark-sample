// React API
import { Fragment } from 'react';
import { PropsWithChildren } from 'react';

// Next API
import type { GetServerSideProps } from 'next';
import { NextSeo } from 'next-seo';
import { groq } from 'next-sanity';
import { useRouter } from 'next/router';

// Fetcher APIs
import sanityClient from 'lib/sanity';
import useSWR from 'swr';
import { useState, useEffect } from 'react';

// Components
import Layout from 'components/Layout';
import SWRStructure from 'components/SWRStructure';
import Pagination from 'components/Pagination';
import ListItem from 'components/ListItem';
import Separator from 'components/Separator';

type Props = {
  name: string;
  pageNumber: number;
};

// Tag page component
const Page = ({ name, pageNumber }: PropsWithChildren<Props>): JSX.Element => {
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
      if (name !== undefined && start !== undefined && end !== undefined)
        return `{"ids":*[ _type == "article" && tags[] -> name match "${name}" ] | order(_createdAt desc) | order(id desc)[${start}...${end}].id, "article_count":count(*[ _type == "article" && tags[] -> name match "${name}" ])}`;
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
      <NextSeo title={`Search for articles tagged with '${name}'`} noindex />
      <section className="vertical_block_margin side_margin">
        Search for articles tagged with &quot;{name}&quot;
      </section>
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
                {index !== length - 1 ? (
                  <Separator />
                ) : (
                  <Fragment key={`empty-${id}`}></Fragment>
                )}
              </Fragment>
            );
          })
        ) : (
          <section key={`warning-${router.asPath}`} className="side_margin">
            There are no articles for this tag yet.
          </section>
        )}
        <Pagination
          pageTotalCount={total}
          pageNumber={pageNumber}
          basePath={`/tag/${name}`}
          router={router}
        />
      </SWRStructure>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const object = { ...params };
  const { name, pageNumber: _pageStr } = object;
  const pageNumber: number | undefined =
    typeof _pageStr === 'string' ? parseInt(_pageStr) : undefined;

  return { props: { name, pageNumber } };
};

export default Page;
