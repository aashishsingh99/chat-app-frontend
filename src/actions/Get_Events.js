import axios from "axios";
import { GET_EVENTS } from "./types";
const io = require("socket.io-client");

const socket = io("http://localhost:5000", { transports: ["websocket"] });
// Register User
export const Get_Events = ({ chatRoomId }) => async (dispatch) => {
  console.log("SAKSHIIIIIIIIIIIIIIIIIIIII");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ chatRoomId });
  try {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    const res = await axios.post("/api/event/getEvents", body, config);
    console.log("calling reducer");
    console.log(res);
    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {}
};
