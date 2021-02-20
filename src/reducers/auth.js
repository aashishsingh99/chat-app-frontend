import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CONV_ERROR,GET_CONV,ADD_CONV,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  category: null,
  conversation:[],
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        
      };
    }
     case GET_CONV:{
      return {
        ...state,
        loading: false,
        conversation: payload,
      };
    }
    case ADD_CONV: {
      state.conversation = state.conversation.filter(
        conversations => conversations._id !== payload._id
      );
      console.log(payload);
      return {
        ...state,
        conversation: [payload, ...state.conversation],
      };
    }
    case CONV_ERROR:
      return {
        ...state,
        error: payload,
       conversation:[],
        loading: false,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        user:payload,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user:null,
      };
    default:
      return state;
  }
}
export default authReducer;
