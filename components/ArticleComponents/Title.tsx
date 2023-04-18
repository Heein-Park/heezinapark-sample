import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
  id: number;
};

const Title = (props: PropsWithChildren<Props>) => (
  <section className="title">
    <Link href="/article/[id]" as={`/article/${props.id}`}>
      {props.children}
    </Link>
  </section>
);

export default Title;
