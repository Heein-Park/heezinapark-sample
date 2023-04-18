import { useTags } from 'modules/TagsProvider';
import Link from 'next/link';

type Props = {
  ids: string[];
};

const Tags = (props: Props) => {
  const { ids } = props;
  const { tags } = useTags();

  if (tags) {
    const usedTags = ids.map((id, index) => {
      const tag = tags.find((object) => object._id === id);

      if (tag) {
        return (
          <section key={tag.name} className="tags_item">
            <Link href={`/tag/${tag.name}`}>{tag.name}</Link>
            {index === ids.length - 1 ? '' : ', '}
          </section>
        );
      } else return <div key={id} />;
      return tag;
    });

    return (
      <section className="tags">
        <>Tags : {usedTags}</>
      </section>
    );
  } else {
    return <></>;
  }
};

export default Tags;
