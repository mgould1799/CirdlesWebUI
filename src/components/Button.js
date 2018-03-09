// @flow
import React from 'react';

type Props = {
  onClick: Function,
  className?: string,
  children: any
};

export const Button = ({
  onClick,
  children,
  className = '',
  ...rest
}: Props) => {
  return (
    <button onClick={onClick} className={'button ' + className} {...rest}>
      {children}
    </button>
  );
};
