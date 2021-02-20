import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  //CLEAR_PROFILE,
} from "./types";
import { setAlert } from "./alert.js";
import setAuthToken from "../utils/setAuthToken";
export const loadUser = () => async (dispatch) => {
  //console.log(localStorage.token);
  
  try {
    // console.log("token hai ye2!");
    // console.log(localStorage.token);
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
    //console.log("in");
    const res = await axios.get("/api/auth");
    console.log("in user loaded");
    // if (res) console.log(res);

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log("action");
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    //localStorage.setItem("token", res.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((errpr) => dispatch(setAlert(errors.msg, "danger")));
    // }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
//login
export const login = (formData) => async (dispatch) => {
  //console.log(email);
  
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  
  try {
    
    const res = await axios.post("/api/auth", formData, config);
    
    //localStorage.setItem("token", res.data.token);
    console.log("before login success dis")
    
    await dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    
    dispatch(loadUser());
    
  } catch (err) {
    //console.log("ye hai error")
    //console.log(err)
    // const errors = err.response.data.errors;
    // if (errors) {
    //   errors.forEach((errpr) => dispatch(setAlert(errors.msg, "danger")));
    // }
    //localStorage.removeItem("token");

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
//logout
export const logout = () => (dispatch) => {
  console.log("logout");
  dispatch({ type: LOGOUT });
};


