import {CLEAR_TYPING} from "./types";
import {CLEAR_TYPING_ERROR} from "./types";

export const clearTyping = () => async dispatch => {
    try {
      dispatch({
        type: CLEAR_TYPING,
        
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: CLEAR_TYPING_ERROR,
      });
    }
  };