// @flow
import React from 'react';
import Radium from 'radium';
import { ProjectCard } from 'components';
import { SQUID } from 'constants';

type Props = {
  history: any
};

const HomePage = ({ history }: Props) => {
  return (
    <div style={styles.home}>
      <div style={styles.cardWrapper}>
        <ProjectCard
          description={SQUID.description}
          logo={require('img/logos/Squid.svg')}
          width={300}
          height={300}
          onClick={() => history.push('/squid')}
        />
      </div>
    </div>
  );
};

const styles = {
  home: {
    height: '100%'
  },
  cardWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Radium(HomePage);
