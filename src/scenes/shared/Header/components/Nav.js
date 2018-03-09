// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { Link } from 'react-router-dom';
import { HamburgerButton } from 'components';

type Props = {};

type State = {
  active: boolean
};

class BaseNav extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    const { active } = this.state;
    return (
      <nav>
        <HamburgerButton active={active} size={50} onClick={() => {}} />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/squid">Squid</Link>
          </li>
          <li>
            <Link to="/ambapo">Ambapo</Link>
          </li>
        </ul>
      </nav>
    );
  }
}

const styles = {};

export const Nav = Radium(BaseNav);
