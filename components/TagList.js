import Link from 'next/link';

const TagList = ({ tags }) => {
  let initialLetterStorage = null;

  const ListByLetters = {};

  if (Array.isArray(tags)) {
    for (const tag of tags) {
      const getInitialLetter = tag.name.charAt(0);
      const keys = Object.keys(ListByLetters);
      const isNewLetter = initialLetterStorage
        ? !keys.includes(getInitialLetter)
        : true;

      initialLetterStorage = getInitialLetter;

      if (isNewLetter) ListByLetters[initialLetterStorage] = [];
      ListByLetters[initialLetterStorage].push(tag.name);
    }
  }

  return (
    <>
      {Object.keys(ListByLetters).map((letter, j) => {
        const categoryLetter = (
          <section className="categoryLetter">{letter}</section>
        );
        const links = ListByLetters[letter].map((tag, i) => (
          <section className="tag" key={i}>
            <Link href={`/tag/${tag}`}>{tag}</Link>
          </section>
        ));
        return (
          <section className="category" key={j}>
            {categoryLetter}
            {links}
          </section>
        );
      })}
    </>
  );
};

export default TagList;
