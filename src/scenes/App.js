import React, { Component } from 'react';
import Radium from 'radium';
import { colors } from 'constants';
import { Header, Body } from './shared';

type Props = {};

class App extends Component<Props> {
  constructor(props: any) {
    super(props);
    const _this: any = this;
    _this.wrapperClicked = this.wrapperClicked.bind(this);
  }

  header;

  wrapperClicked(e: Event) {
    this.header && this.header.closeMenu();
  }

  render() {
    return (
      <div style={styles.wrapper} onClick={this.wrapperClicked}>
        <Header ref={header => (this.header = header)} />
        <Body />
      </div>
    );
  }
}

const styles = {
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.primary
  }
};

export default Radium(App);
