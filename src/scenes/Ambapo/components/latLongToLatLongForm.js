// @flow
import React from 'react';
import Radium from 'radium';
import { Field, reduxForm } from 'redux-form';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { convertLatlongToLatlong } from 'actions';
import { colors } from 'constants';
import { Button } from 'components';

type Props = {
  handleSubmit: Function,
  submitting: boolean,
  latLongToLatLongData: any,
  convertLatlongToLatlong: Function
};

const Form = props => {
  const {
    handleSubmit,
    submitting,
    latLongToLatLongData,
    convertLatlongToLatlong
  } = props;
  return (
    <div style={[styles.wrapper, styles.container]}>
      <div style={styles.titles}>
        <div style={styles.title}>From</div>
        <div style={styles.submitWrapper} />
        <div style={styles.title}>To</div>
      </div>
      <form onSubmit={handleSubmit} style={styles.wrapper}>
        <div style={styles.innerWrapper}>
          <div style={styles.field}>
            <div style={styles.fieldText}>Latitude:</div>
            <Field
              style={styles.inputField}
              component="input"
              type="text"
              name="latitude"
              placeholder="Latitude"
            />
          </div>
          <div style={styles.field}>
            <div style={styles.fieldText}>Longitude:</div>
            <Field
              style={styles.inputField}
              component="input"
              type="text"
              name="longitude"
              placeholder="Longitude"
            />
          </div>
          <div style={styles.field}>
            <div style={styles.fieldText}>Datum:</div>
            <div style={styles.datumField}>
              <Field component="select" name="fromDatum">
                <option value="WGS84">WGS84</option>
                <option value="NAD83">NAD83</option>
              </Field>
            </div>
          </div>
        </div>
        <div style={styles.submitWrapper}>
          <Button type="submit" size={20} color={colors.ambapo}>
            Convert
          </Button>
        </div>
        <div style={styles.innerWrapper}>
          <div style={styles.field}>
            <div style={styles.fieldText}>Latitude:</div>
            <input
              style={styles.inputField}
              value={latLongToLatLongData && latLongToLatLongData.latitude}
              disabled={true}
            />
          </div>
          <div style={styles.field}>
            <div style={styles.fieldText}>Longitude:</div>
            <input
              style={styles.inputField}
              value={latLongToLatLongData && latLongToLatLongData.longitude}
              disabled={true}
            />
          </div>
          <div style={styles.field}>
            <div style={styles.fieldText}>Datum:</div>
            <div style={styles.datumField}>
              <Field component="select" name="toDatum">
                <option value="WGS84">WGS84</option>
                <option value="NAD83">NAD83</option>
              </Field>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    flexDirection: 'column'
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  innerWrapper: {
    flex: 1,
    padding: '10px 10% 10px 10%',
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  titles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    fontSize: '2em',
    margin: 35,
    textAlign: 'center'
  },
  submitWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  field: {
    display: 'flex',
    margin: '10px 0px'
  },
  fieldText: {
    flex: 0.4,
    fontSize: '1.2em',
    display: 'flex',
    alignItems: 'center'
  },
  inputField: {
    flex: 0.6,
    fontSize: '1em',
    border: `solid 1px ${colors.ambapo}`,
    borderRadius: 5,
    padding: 7,
    color: 'black'
  },
  datumField: {
    flex: 0.6
  }
};

function mapStateToProps(state) {
  return {
    latLongToLatLongData: state.ambapo.latLongToLatLongData
  };
}

export const LatLongToLatLongForm = reduxForm({
  form: 'LatLongToLatLong',
  initialValues: {
    fromDatum: 'WGS84',
    toDatum: 'NAD83'
  }
})(connect(mapStateToProps)(Radium(Form)));
