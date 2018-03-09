import React from 'react';
import Radium from 'radium';
import { Switch, Route } from 'react-router-dom';
import { HEADER_HEIGHT } from 'constants';
import Home from '../Home';
import Squid from '../Squid';
import Ambapo from '../Ambapo';

const BaseBody = () => (
  <main style={styles.body}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/squid" component={Squid} />
      <Route path="/ambapo" component={Ambapo} />
    </Switch>
  </main>
);

const styles = {
  body: {
    padding: `${HEADER_HEIGHT + 10}px 10px 10px 10px`,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

export const Body = Radium(BaseBody);
