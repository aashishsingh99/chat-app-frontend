import axios from "axios";
import { ADD_CONV } from "./types";
 import { CONV_STATE } from "./types";
// import { CONV_ERROR } from "./types";
const io = require("socket.io-client");

// Register User
export const new_conver_state = ( newConvo ) => async (dispatch) => {

  try {
    console.log("DDDDDDDDDDD");
    
    dispatch({
      type: CONV_STATE,
      payload: newConvo,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CONV_ERROR,
    // });
  }
};
