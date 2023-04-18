import React from 'react';
import { SxProps, Theme } from '@mui/system';
import Box from '@mui/system/Box';

type Props = {
  sx: SxProps<Theme>,
  children: React.ReactNode | React.ReactNode[]
}

const Navigation = (props: Props) => {
  const sx = props.sx;
  const children = React.Children.toArray(props.children);

  return (
    <Box
      component='section'
      sx={sx}
    >
      {children.map((item:JSX.Element, i) => {
        return (
          <Box
            component='section'
            className={`nav_item ${i !== 0 ? 'margin_except_first' : ''}`}
            key={`menuItems-${i}`}
          >
            {item}
          </Box>
        );
      })}
    </Box>
  );
};

export default Navigation;
