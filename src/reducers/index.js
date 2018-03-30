// @flow
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ambapoReducer from './ambapo';

const rootReducer = combineReducers({
  form: formReducer,
  ambapo: ambapoReducer
});

export default rootReducer;
