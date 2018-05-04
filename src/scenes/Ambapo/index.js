// @flow
import React, { Component } from 'react';
import Radium from 'radium';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { convertLatlongToLatlong } from 'actions';
import { LatLongToLatLongForm } from './components';

type Props = {
  convertLatlongToLatlong: Function
};

class AmbapoPage extends Component<Props> {
  constructor(props: any) {
    super(props);
    const _this: any = this;
    _this.latLongToLatLongSubmit = this.latLongToLatLongSubmit.bind(this);
  }

  latLongToLatLongSubmit(values) {
    const { convertLatlongToLatlong } = this.props;
    const { latitude, longitude, fromDatum, toDatum } = values;
    if (latitude && longitude && fromDatum && toDatum) {
      convertLatlongToLatlong(latitude, longitude, fromDatum, toDatum);
    }
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <LatLongToLatLongForm onSubmit={this.latLongToLatLongSubmit} />
      </div>
    );
  }
}
const styles = {
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  }
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    convertLatlongToLatlong: bindActionCreators(
      convertLatlongToLatlong,
      dispatch
    )
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Radium(AmbapoPage));
