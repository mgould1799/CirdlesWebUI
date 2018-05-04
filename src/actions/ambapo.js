// @flow
import {
  LATLONG_TO_LATLONG_INIT,
  LATLONG_TO_LATLONG_SUCCESS,
  LATLONG_TO_LATLONG_FAILURE
} from './types';
import { AMBAPO_ENDPOINT, POST_HEADERS } from 'constants';

export const convertLatlongToLatlong = (
  latitude: number,
  longitude: number,
  fromDatum: string,
  toDatum: string
) => {
  return (dispatch: any) => {
    dispatch({ type: LATLONG_TO_LATLONG_INIT });
    const data = { latitude, longitude, fromDatum, toDatum };
    fetch(AMBAPO_ENDPOINT + '/latlong/latlong', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(data)
    })
      .then((response: Response) => response.json())
      .then(data => dispatch({ type: LATLONG_TO_LATLONG_SUCCESS, data }))
      .catch(error => dispatch({ type: LATLONG_TO_LATLONG_FAILURE, error }));
  };
};
