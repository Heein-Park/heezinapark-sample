import { JSXElementConstructor, PropsWithChildren, Fragment } from 'react';

// Compose all components into one JSX element

// Array Class -> Generic Variable = 'React.JSXElementConstructor'
// JSXElementConstructor -> Generic Variable = 'React.PropsWithChildren'
// PropsWithChildren -> Generic Variable = 'unknown'

type Props = {
  components: Array<JSXElementConstructor<PropsWithChildren<unknown>>>
}

export default function Compose(props: PropsWithChildren<Props>) {
  const { components = [], children } = props;

  return (
    <Fragment>
      {
        components.reduceRight(
          (acc, Comp) => <Comp>{acc}</Comp>,
          children
        )
      }
    </Fragment>
  );
}