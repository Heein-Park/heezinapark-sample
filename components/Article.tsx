import { PortableText } from '@portabletext/react';

// Components
import Title from 'components/ArticleComponents/Title';
import CreatedAt from 'components/ArticleComponents/CreatedAt';
import Tags from 'components/ArticleComponents/Tags';
import { articleType } from 'lib/types';
import type {
  PortableTextTypeComponentProps,
  PortableTextMarkComponentProps,
  PortableTextComponents,
} from '@portabletext/react';

type codeType = {
  _key: string;
  _type: string;
  code: string;
  language: string;
};

type markType = {
  _key: string;
  _type: string;
  blank: boolean;
  href: string;
};

const TextComponents: Partial<PortableTextComponents> = {
  types: {
    code: (codeComponentProps: PortableTextTypeComponentProps<codeType>) => {
      const { value } = codeComponentProps;
      const { code } = value;

      return (
        <pre>
          <code>{code}</code>
        </pre>
      );
    },
  },
  marks: {
    link: (linkComponentProps: PortableTextMarkComponentProps<markType>) => {
      const { children, value } = linkComponentProps;

      const rel =
        value && (value.href.startsWith('/') || value.blank === true)
          ? 'noreferrer noopener'
          : undefined;

      const target = value && value.blank === true ? '_blank' : undefined;

      return (
        <>
          {value && value.href ? (
            <a href={value.href} rel={rel} target={target}>
              {children}
            </a>
          ) : (
            <>{children}</>
          )}
        </>
      );
    },
  },
};

const Article = (props: { article: articleType }) => {
  const { article } = props;
  const { body, tags, title, _createdAt, id } = article;

  return (
    <article className="vertical_block_margin side_margin">
      <header className="block_end_margin">
        <Title id={id}>{title}</Title>
        <CreatedAt createdAt={_createdAt} />
      </header>
      <main className="block_end_margin">
        <PortableText
          value={body}
          components={TextComponents}
          onMissingComponent={false}
        />
      </main>
      {tags ? (
        <footer>
          <Tags ids={tags} />
        </footer>
      ) : (
        <></>
      )}
    </article>
  );
};

export default Article;
