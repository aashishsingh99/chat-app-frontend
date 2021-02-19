import axios from "axios";

import { setAlert } from "./alert.js";
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

  
  } catch (err) {
   
  }
};
