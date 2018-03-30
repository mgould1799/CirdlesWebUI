// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { convertLatlngToLatlng } from 'actions';

type Props = {
  latLngToLatLngData: any,
  convertLatlngToLatlng: Function
};

class AmbapoPage extends Component<Props> {
  render() {
    return <div />;
  }
}

function mapStateToProps(state) {
  return {
    latLngToLatLngData: state.ambapo.latLngToLatLngData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    convertLatlngToLatlng: bindActionCreators(convertLatlngToLatlng, dispatch)
  };
}

export default Radium(AmbapoPage);
