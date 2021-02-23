import axios from "axios";
 import {STATE_CONVERSATION } from "./types";

import socket from "../socketConfig";

// Register User
export const State_conversation = ({ event }) => async (dispatch) => {
  
  let type = "CREATE";
  
  

  try {
    console.log("inside action  state_conversation");
    console.log(event);
    //const res = await axios.post("/api/event/", body, config);
    console.log("hello MESSAGEEEEEEE");
  
    dispatch({
      type: STATE_CONVERSATION,
      payload: event,
    });
    //console.log("calling socket");
    
    // socket.emit("new_message", { text,chatRoomId}, (error) => {
    //    console.log("YYYYYYYYYYYYYYYYYYYYY");
    //   if (error) {
    //     alert(error);
    //   }
    // });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CONV_ERROR,
    // });
  }
};
