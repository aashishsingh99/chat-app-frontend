import axios from "axios";
 import {DELETE_MESSAGE } from "./types";

import socket from "../socketConfig";

// Register User
export const DeleteMessage = ({ text, chatRoomId,messageId }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(chatRoomId);
  console.log(messageId);
  let type = "CREATE";
  
  const body = JSON.stringify({ chatRoomId, type, messageId, text });
  try {
    console.log("inside action delete message!");
    const res = await axios.post("/api/event/delete", body, config);
    console.log("hello MESSAGEEEEEEEd");
    // console.log(res.data);
    dispatch({
      type: DELETE_MESSAGE,
      payload: res.data,
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
