import React from 'react';
import Radium from 'radium';
import { colors } from 'constants';
import { Header, Body } from './shared';

const App = () => (
  <div style={styles.wrapper}>
    <Header />
    <Body />
  </div>
);

const styles = {
  wrapper: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.primary
  }
};

export default Radium(App);
