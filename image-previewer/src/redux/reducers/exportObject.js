import { handleActions } from 'redux-actions';
import * as types from '../constants';

const initialState = {
  url: null,
};

export default handleActions({
  [types.TO_DATA_URL]: (state, action) => ({ url: action.payload } ),
}, initialState);
