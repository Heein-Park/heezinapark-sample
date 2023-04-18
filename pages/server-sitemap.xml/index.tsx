// pages/server-sitemap-index.xml/index.tsx
import { getServerSideSitemapLegacy } from 'next-sitemap';
import { GetServerSideProps } from 'next';
import sanityClient from 'lib/sanity';
import { groq } from 'next-sanity';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const articleIdArray = await sanityClient.fetch(
    groq`${'*[_type == "article"] |order(_createdAt desc) | order(id desc).id'}`
  );
  const tagNameArray = await sanityClient.fetch(
    groq`${'*[_type == "tag"] | order(name asc).name'}`
  );

  const articleURLMap = articleIdArray.map((id: string) => {
    return {
      loc: `https://heez.in/article/${id}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.5,
    };
  });
  const tagURLMap = tagNameArray.map((name: string) => {
    return {
      loc: `https://heez.in/tag/${name}`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: 0.5,
    };
  });

  return getServerSideSitemapLegacy(ctx, [...articleURLMap, ...tagURLMap]);
};

// Default export to prevent next.js errors
export default function SitemapIndex() {
  return <></>;
}
