import axios from "axios";
 import {STATE_DELETE } from "./types";

import socket from "../socketConfig";

// Register User
export const delete_message_state = ({ event }) => async (dispatch) => {
 
  try {
    console.log("inside action delete_message_state");
    console.log(event);
    //const res = await axios.post("/api/event/", body, config);
  
  
    dispatch({
      type: STATE_DELETE,
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
