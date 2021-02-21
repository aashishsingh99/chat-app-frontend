import axios from "axios";
 import {ADDMESSAGE } from "./types";
import { CONV_ERROR } from "./types";
const io = require("socket.io-client");

// Register User
export const postMessage = ({ text, chatRoomId }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(chatRoomId);
  let type = "CREATE";
  let messageId= "5";
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
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CONV_ERROR,
    // });
  }
};
