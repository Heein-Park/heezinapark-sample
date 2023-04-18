// https://blog.logrocket.com/using-react-children-prop-with-typescript/

import { useContext, createContext } from 'react';
import useSWR from 'swr';
import sanityClient from 'lib/sanity';
import { PropsWithChildren } from 'react';
import { groq } from 'next-sanity';

type tagType = {
  _id: string;
  hide_attributes: ('title' | 'date' | 'tag')[];
  name: string;
  [other: string | number | symbol]: unknown;
};

export type { tagType };

const dummy: tagType = {
  _id: '',
  hide_attributes: [],
  name: '',
};

const TagContext = createContext({
  tags: [dummy],
  error: undefined,
  isLoading: true,
});

export const useTags = () => useContext(TagContext);

const TagsProvider = ({ children }: PropsWithChildren) => {
  const {
    data: tags,
    error,
    isLoading,
  } = useSWR('*[_type == "tag"] | order(name asc){...}', (query: string) =>
    sanityClient.fetch(groq`${query}`)
    );
  
  const loadingError = (
    data: tagType | null | undefined,
    isLoading: boolean
  ): Error | undefined => {
    if (!isLoading && !data)
      return new Error('SWR has loaded a data, but data are empty.');
    else return undefined;
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        isLoading,
        error: error ? error : loadingError(tags, isLoading),
      }}
    >
      {children}
    </TagContext.Provider>
  );
};

export default TagsProvider;
