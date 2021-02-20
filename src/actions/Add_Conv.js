import axios from "axios";
import { ADD_CONV } from "./types";
const io = require("socket.io-client");

const socket = io("http://localhost:5000", { transports: ["websocket"] });
// Register User
export const Add_Conv = ({ user_name }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ user_name });
  try {
    console.log("inside action");
    const res = await axios.post("/api/users/newConversation", body, config);

    dispatch({
      type: ADD_CONV,
      payload: res.data,
    });
  
  } catch (err) {}
};
