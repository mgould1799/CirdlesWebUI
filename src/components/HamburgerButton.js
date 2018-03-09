// @flow
import React, { Component } from 'react';
import Radium from 'radium';

type Props = {
  onClick: Function,
  size: number,
  active: boolean
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
    const { children, onClick, size, active } = this.props;
    return (
      <div
        onClick={onClick}
        style={[styles.wrapper, { height: size, width: size }]}
      >
        <div style={[styles.line, { transform: active && 'rotate(45deg)' }]} />
        <div style={[styles.line, { opacity: active && 0 }]} />
        <div style={[styles.line, { transform: active && 'rotate(-45deg)' }]} />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    cursor: 'pointer'
  },
  line: {
    height: 3,
    width: '100%',
    transition: 'all 0.5s ease'
  }
};

export const HamburgerButton = Radium(Hamburger);
