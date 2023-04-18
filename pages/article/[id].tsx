// Next API
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import { groq } from 'next-sanity';

// Components
import Layout from 'components/Layout';
import Article from 'components/Article';
import SWRStructure from 'components/SWRStructure';
import useArticle from 'modules/useArticle';
import { toPlainText } from '@portabletext/react';

// Micellaneous
import { PropsWithChildren } from 'react';
import sanityClient from 'lib/sanity';
import type { PortableTextBlock } from '@portabletext/types';

type Props = {
  metaData: {
    id: number;
    title: string;
    body: PortableTextBlock[];
    locale: string;
  };
};

const Page = ({ metaData }: PropsWithChildren<Props>) => {
  const router = useRouter();
  const { id, title, body, locale } = metaData;
  const { data: article, isLoading, error } = useArticle(id);

  const plainText = toPlainText(body);
  let description = plainText.replace(/\n/g, ' ');
  description = description.substring(0, 160);

  return (
    <Layout>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          type: 'article',
          url: `https://heez.in/${locale}/article/${id}`,
          title: title,
          locale: locale,
          description: description,
        }}
      />
      <SWRStructure isLoading={isLoading} error={error} router={router}>
        {article ? <Article article={article} /> : <></>}
      </SWRStructure>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const object = { ...params };
  const { id: idStr } = object;
  const id: number | undefined =
    typeof idStr === 'string' ? parseInt(idStr) : undefined;

  const query = `*[_type == "article" && defined(id) && id == ${id}][0] {
    'title':coalesce(translations[languages_code=='${locale}'][0].title, translations[][0].title),
    'body':coalesce(translations[languages_code=='${locale}'][0].body, translations[][0].body)
  }`;
  const metaData = await sanityClient.fetch(groq`${query}`);
  metaData.locale = locale;
  metaData.id = id;

  return { props: { metaData } };
};

export default Page;
