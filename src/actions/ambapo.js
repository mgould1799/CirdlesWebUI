// @flow
import {
  LATLNG_TO_LATLNG_INIT,
  LATLNG_TO_LATLNG_SUCCESS,
  LATLNG_TO_LATLNG_FAILURE
} from './types';
import { AMBAPO_ENDPOINT, POST_HEADERS } from 'constants';

export const convertLatlngToLatlng = (
  latitude: number,
  longitude: number,
  fromDatum: string,
  toDatum: string
) => {
  return (dispatch: any) => {
    dispatch({ type: LATLNG_TO_LATLNG_INIT });
    const data = { latitude, longitude, fromDatum, toDatum };
    fetch(AMBAPO_ENDPOINT + '/latlng/latlng', {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify(data)
    })
      .then((response: Response) => response.json())
      .then(data => dispatch({ type: LATLNG_TO_LATLNG_SUCCESS, data }))
      .catch(error => dispatch({ type: LATLNG_TO_LATLNG_FAILURE, error }));
  };
};
