import axios from "axios";
import { GET_CONV } from "./types";
import { CONV_ERROR } from "./types";
import { setAlert } from "./alert.js";

// Register User
export const Get_Conv = ({ user_name }) => async (dispatch) => {
  //   console.log("inside get convo action1234564321");

  console.log("ody");

  try {
    console.log("Hp");
    const res = await axios.get("/api/users/conversations");
    console.log("response");
    console.log(res);

    dispatch({
      type: GET_CONV,
      payload: res.data,
    });
    
  } catch (err) {
    dispatch({
      type: CONV_ERROR,
    });
  }
};
