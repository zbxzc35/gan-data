import { handleActions } from 'redux-actions';
import * as types from '../constants';

const initialState = {
  byIds:{},
  allIds:[]
};

export default handleActions({
  [types.OBJECT_SELECTED]: (state, action) => ({ ...state, ...action.payload.toJSON() }),
  [types.OBJECT_MOVING]: (state, action) => ({ ...state, ...action.payload.toJSON() }),
  [types.OBJECT_MODIFIED]: (state, action) => ({ ...state, ...action.payload.toJSON() }),
  [types.OBJECT_SCALING]: (state, action) => ({ ...state, ...action.payload.toJSON() }),
  [types.OBJECT_CLEARED]: () => initialState,

  [types.OBJECT_SET_LEFT]: (state, action) => ({ ...state, ...action.payload.toJSON() }),
  [types.OBJECT_SET_TOP]: (state, action) => ({ ...state, ...action.payload.toJSON() }),
  [types.OBJECT_SET_WIDTH]: (state, action) => ({ ...state, ...action.payload.toJSON() }),
  [types.OBJECT_SET_HEIGHT]: (state, action) => ({ ...state, ...action.payload.toJSON() }),

}, initialState);