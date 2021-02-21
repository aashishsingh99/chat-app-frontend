import axios from "axios";
import { CURRENT_CONV } from "./types";
import { CONV_ERROR } from "./types";
const io = require("socket.io-client");

// Register User
export const newConversation = ({ chatid }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(chatid);
  const body = JSON.stringify({ chatid });
  try {
    console.log("inside action new conversation");
    const res = await axios.post("/api/users/conversation", body, config);
    console.log("hello aashish");
    console.log(res.data);
    dispatch({
      type: CURRENT_CONV,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CONV_ERROR,
    });
  }
};
