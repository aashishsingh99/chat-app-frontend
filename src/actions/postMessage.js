import axios from "axios";
 import {ADDMESSAGE } from "./types";
import { CONV_ERROR } from "./types";
import socket from "../socketConfig";

// Register User
export const postMessage = ({ text, chatRoomId,messageId }) => async (dispatch) => {
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
    console.log("inside action post Message");
    const res = await axios.post("/api/event/", body, config);
    console.log("hello MESSAGEEEEEEE");
    console.log(res.data);
    dispatch({
      type: ADDMESSAGE,
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
