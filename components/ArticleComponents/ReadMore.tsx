import Link from 'next/link';
import { PropsWithChildren } from 'react';

type Props = {
  id: number;
};

const ReadMore = (props: PropsWithChildren<Props>) => (
  <section className="text_align_center vertical_block_margin">
    <Link href="/article/[id]" as={`/article/${props.id}`}>
      Click this to read the full article
    </Link>
  </section>
);

export default ReadMore;
