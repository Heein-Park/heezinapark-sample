// Fetcher APIs
import sanityClient from 'lib/sanity';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { groq } from 'next-sanity';
import { articleType } from 'lib/types';

const useArticle = (
  id: number
): {
  data: articleType | undefined;
  isLoading: boolean;
  error: Error | undefined;
} => {
  const { locale } = useRouter();

  const {
    data,
    error,
    isLoading,
  }: {
    data: articleType | undefined;
    isLoading: boolean;
    error: Error | undefined;
  } = useSWR(
    () => `
    *[_type == "article" && defined(id) && id == ${id}][0]
      {
        id,
        _createdAt,
        _updatedAt,
        'tags':tags[]._ref,
        'title':coalesce(translations[languages_code=='${locale}'][0].title, translations[][0].title),
        'body':coalesce(translations[languages_code=='${locale}'][0].body, translations[][0].body)
      }
    `,
    (query: string) => sanityClient.fetch(groq`${query}`)
  );

  const loadingError = (
    data: articleType | null | undefined,
    isLoading: boolean
  ): Error | undefined => {
    if (!isLoading && !data)
      return new Error('SWR has loaded a data, but data are empty.');
    else return undefined;
  };

  return {
    data,
    isLoading,
    error: error ? error : loadingError(data, isLoading),
  };
};

export default useArticle;
