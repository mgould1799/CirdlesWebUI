// @flow
import React from 'react';
import Radium from 'radium';
import { SVGImage } from '.';

type Props = {
  description: string,
  logo: any,
  width: any,
  height: any,
  onClick: Function,
  style: any
};

const Card = ({
  description,
  logo,
  width,
  height,
  onClick,
  style = {}
}: Props) => {
  return (
    <div style={[styles.wrapper, { width, height }, style]} onClick={onClick}>
      <div style={styles.description} key="description">
        <div style={styles.descriptionText}>{description}</div>
      </div>
      <div style={styles.svgWrapper}>
        <SVGImage style={styles.svg} src={logo} />
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    transition: 'all 0.4s ease',
    boxShadow: '5px 5px 5px #888888',
    cursor: 'pointer',
    ':hover': {
      boxShadow: 'none'
    }
  },
  description: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    color: '#ffffff',
    backgroundColor: 'rgba(75, 75, 75, 0.9)',
    position: 'absolute',
    width: 'inherit',
    height: 'inherit',
    opacity: 0,
    transition: 'all 0.4s ease',
    ':hover': {
      opacity: 1
    }
  },
  descriptionText: {
    padding: 20,
    fontSize: '1.1em',
    textAlign: 'center'
  },
  svgWrapper: {
    margin: 20,
    width: '80%',
    height: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  svg: {
    width: '100%',
    height: '100%'
  }
};

export const ProjectCard = Radium(Card);
