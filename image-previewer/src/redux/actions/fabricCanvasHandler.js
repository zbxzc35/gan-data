import * as types from '../constants';
import {fabric} from 'fabric';

export const initialize = (id, canvas) => (dispatch, getState) => {    
  dispatch({
      type: types.CANVAS_INITIALIZE, 
      id: id, canvas: canvas.toJSON()});
};

export const addObject = (id, object) => (dispatch, getState) => {  
  // fabricCanvas.add(object);
  // fabricCanvas.setActiveObject(object); 
  dispatch({type: types.ADD_OBJECT, id: id, object: object.toJSON()});
  // dispatch({type: types.OBJECT_SELECTED, payload: object});
};

export const modified = event => ({type: types.OBJECT_MODIFIED, payload: event.target});

export const refresh = id => ({type: types.CANVAS_REFRESH, id: id});


export const toDataURL = (id) => (dispatch, getState) => {
  const fabricCanvas = getState().views.byId[id].canvas;
  const dataURL = fabricCanvas.toDataURL({format: 'jpeg', quality: 0.8});
  dispatch({type: types.TO_DATA_URL, payload: dataURL}); // and id
}