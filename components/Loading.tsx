import CircularProgress from '@mui/material/CircularProgress';
import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { createRef, forwardRef } from 'react';

const LoadingBox = styled(Box)<BoxProps>(
  () => ({
    minHeight: 300,
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center'
  })
);

export default forwardRef(
  function ForwardLoading(props) {
    const ref = createRef<HTMLDivElement>();

    return (
      <LoadingBox {...props} ref={ref}>
        <CircularProgress color='primary' />
      </LoadingBox>
    );
  }
);
