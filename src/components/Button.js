// @flow
import React from 'react';
import Radium from 'radium';
import { colors } from 'constants';

type Props = {
  onClick: Function,
  size?: number,
  color?: string,
  textColor?: string,
  children?: any
};

const BaseButton = ({
  onClick,
  size = 12,
  color = colors.dark,
  children,
  ...rest
}: Props) => {
  const style = {
    fontSize: size,
    padding: `${Math.round(size / 4)}px ${Math.round(size / 1.5)}px`,
    backgroundColor: 'transparent',
    border: `solid 1px ${color}`,
    color,
    ':hover': {
      backgroundColor: color,
      color: colors.white,
      border: `solid 1px ${color}`
    }
  };
  return (
    <button style={[styles.button, style]} onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

const styles = {
  button: {
    borderRadius: 50,
    transition: 'all 0.4s',
    ':hover': {
      cursor: 'pointer'
    }
  }
};

export const Button = Radium(BaseButton);
