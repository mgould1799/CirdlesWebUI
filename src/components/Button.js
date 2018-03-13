// @flow
import React from 'react';

type Props = {
  onClick: Function,
  children?: any
};

export const Button = ({ onClick, children, ...rest }: Props) => {
  return (
    <button onClick={onClick} {...rest}>
      {children}
    </button>
  );
};
