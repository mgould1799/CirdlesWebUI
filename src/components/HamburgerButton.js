// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { colors } from 'constants';

type Props = {
  onClick: Function,
  size: number,
  active: boolean,
  color?: string,
  activeColor?: string,
  style?: any
};

class Hamburger extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    if (this.props.active && !nextProps.active) {
      // activates
    } else if (!this.props.active && nextProps.active) {
      // deactivates
    }
  }

  render() {
    const {
      onClick,
      size,
      active,
      style = {},
      color = colors.dark,
      activeColor = colors.white
    } = this.props;
    const margin = `${Math.floor(size / 3)}px`;
    const height = Math.floor(size / 6);
    const width = Math.floor(size * 1.2);
    return (
      <div
        onClick={onClick}
        style={[styles.wrapper, { height: size, width }, style]}
      >
        <div
          style={[
            styles.line,
            {
              backgroundColor: color,
              height,
              width,
              position: 'absolute',
              marginTop: `-${margin}`
            },
            active && {
              transform: 'rotate(-45deg)',
              marginTop: '0px',
              backgroundColor: activeColor
            }
          ]}
        />
        <div
          style={[
            styles.line,
            {
              backgroundColor: color,
              height,
              width,
              position: 'absolute'
            },
            active && { opacity: 0, backgroundColor: activeColor }
          ]}
        />
        <div
          style={[
            styles.line,
            {
              backgroundColor: color,
              height,
              width,
              position: 'absolute',
              marginTop: margin
            },
            active && {
              transform: 'rotate(45deg)',
              marginTop: '0px',
              backgroundColor: activeColor
            }
          ]}
        />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  line: {
    transition: 'all 0.5s ease',
    borderRadius: 5
  }
};

export const HamburgerButton = Radium(Hamburger);
