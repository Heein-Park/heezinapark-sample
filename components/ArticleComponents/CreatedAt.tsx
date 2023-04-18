import { PropsWithChildren } from 'react';

type Props = {
  createdAt: string;
};

const CreatedAt = (props: PropsWithChildren<Props>) => {
  const createdAt = new Date(props.createdAt);
  const utcDate = createdAt.toUTCString();

  return <section className="createdAt">Created on {utcDate}</section>;
};

export default CreatedAt;
