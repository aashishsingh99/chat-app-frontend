import axios from "axios";
 import {EDIT_MESSAGE } from "./types";

import socket from "../socketConfig";

// Register User
//text is original  text

export const EditMessage = ({ text, chatRoomId,messageId,updatedText }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(chatRoomId);
  console.log(messageId);
  let type = "CREATE";
  
  const body = JSON.stringify({ chatRoomId, type, messageId, text,updatedText });
  try {
    console.log("inside action edit message!");
    const res = await axios.post("/api/event/edit", body, config);
    console.log("SAKSHIIIIIIIII");
    console.log("response");
    console.log(res);
    dispatch({
      type: EDIT_MESSAGE,
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
