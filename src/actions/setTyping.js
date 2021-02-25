import {SET_TYPING} from "./types";
import {SET_TYPING_ERROR} from "./types";

export const setTyping = (chat_typing_id) => async dispatch => {
    try {
      dispatch({
        type: SET_TYPING,
        payload: chat_typing_id,
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SET_TYPING_ERROR,
      });
    }
  };