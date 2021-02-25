import axios from "axios";
 import {SHOW_ONLINE } from "./types";

import socket from "../socketConfig";

// Register User
export const Show_Online = ({ chat_id }) => async (dispatch) => {
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
     // console.log(chat_id,"chat id inside action online")
      const body = JSON.stringify({ chat_id });
      
      console.log("inside action online ");
        const res = await axios.post("/api/event/online", body, config);
        console.log("hello ONLINEEEEE");
        console.log(res.data);
      
  try {
    dispatch({
      type: SHOW_ONLINE,
      payload: res.data,
    })
  }
      catch (err) {
     console.log(err);
      }
    
  };