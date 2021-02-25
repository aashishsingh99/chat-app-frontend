import axios from "axios";
import { SET_READ } from "./types";

const io = require("socket.io-client");

// Register User
export const save_changes_to_state = ({ chatRoomId }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ chatRoomId });
  try {
    console.log("###########################");
    dispatch({
      type: SET_READ,
    });

    //const res = await axios.post("/api/event/save_changes", body, config);
    //console.log(res.data, "response of read_updateState action");
  } catch (err) {
    console.log(err);
    // dispatch({
    //   type: CONV_ERROR,
    // });
  }
};
