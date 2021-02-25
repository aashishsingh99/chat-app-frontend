import axios from "axios";
import { READ_CONV } from "./types";
// import { CONV_ERROR } from "./types";
const io = require("socket.io-client");

// Register User
export const read_updateState = (chatRoomId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ chatRoomId });
  try {
    console.log("READ ACTION ");
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    const res = await axios.post("/api/event/read_message", body, config);
    console.log(res.data, "response of read_updateState action");

    dispatch({
      type: READ_CONV,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CONV_ERROR,
    // });
  }
};
