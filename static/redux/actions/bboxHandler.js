import {fabric} from 'fabric';
import b64toBlob from 'b64-to-blob';
import {createAction} from 'redux-actions';

import * as API from '../../api/objectDetection';
import * as types from '../constants';

export const selected = createAction(types.OBJECT_SELECTED);

export const select = (canvas, id, event) => (dispatch, getState) => {
 dispatch({type: types.OBJECT_SELECTED, 
            id: id, 
            object: event.target})

};

export const scaling =(canvas, id, event) => (dispatch, getState) => {
  let obj = event.target;

  const {width, height, scaleX, scaleY, strokeWidth} = obj;
  obj
    .setWidth(width * scaleX)
    .setHeight(height * scaleY)
    .setScaleX(1)
    .setScaleY(1);

    dispatch({type: types.MODIFY_CANVAS, id: id, canvas: JSON.stringify(canvas)});
  
};

export const moving  =(canvas, id, event) => (dispatch, getState) => {
  if (getState().views.byId[id].confirmed){
    // reference confirmSelectedObject in fabricCanvashandler
    let view = getState().views.byId[id]
    let fix_obj = JSON.parse(view.canvas)['objects'][0]
    let moving_obj = JSON.parse(view.canvas)['objects'][1]
    // TODO: copy region image of fixed_obj int moving_obj
    // moving_obj = {...moving_obj, fill: pattern}
    let generated_json = JSON.parse(getState().views.byId[`generated-${id}`].canvas)
    generated_json = {...generated_json,['objects']: [moving_obj]}
    dispatch({
        type:  types.OBJECT_MOVING,
        id:    `generated-${id}`,
        canvas: JSON.stringify(generated_json)
      })
    // fabric.Image.fromURL(JSON.parse(view.canvas)['backgroundImage'].src, 
    //   function(img){
    //     img.set({
    //       originX: fix_obj.top,
    //       originY: fix_obj.left
    //     })
    //     var patternCanvas = new fabric.StaticCanvas();
    //     patternCanvas.add(img)
    //     patternCanvas.renderAll();

    //     var pattern = new fabric.Pattern({
    //       source: patternCanvas.getElement() ,
    //       repeat: 'repeat'
    //     });
    //     console.log(pattern)

    // })
   

    let isDebugging = getState().images.byId[id].isDebugging
    if (isDebugging){
      let objects         = JSON.parse(view.canvas)['objects']
      let new_canvas_json = Object.assign({}, JSON.parse(getState().views.byId[`debug-${id}`].canvas))
      
      var bboxes = objects.map(function(box){
        return {
          top: box.top,
          left: box.left,
          width: box.width,
          height: box.height
        }
      })    
      console.log(bboxes)
      // @TODO: logiccccc
      let result = API.update_debug(id, bboxes)
      result.then(
        function(res){      
          let blobURL = URL.createObjectURL(b64toBlob(res.data, 'data:image/jpg;base64,'));
          fabric.Image.fromURL(blobURL, 
            function(image){
              new_canvas_json['backgroundImage'].src = blobURL
              dispatch({
                type: types.OBJECT_MOVING,
                id: `debug-${id}`,
                canvas: JSON.stringify(new_canvas_json),
              });
          })  
      })
    }
  }  
}
