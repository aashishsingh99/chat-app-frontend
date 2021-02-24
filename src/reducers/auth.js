import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CONV_ERROR,
  GET_CONV,
  ADD_CONV,
  CURRENT_CONV,
  GET_EVENTS,
  ADDMESSAGE,
  CONV_STATE,
  STATE_CONVERSATION,
  DELETE_MESSAGE,
  STATE_DELETE,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  category: null,
  conversation: [],
  currentconversation: {},
  currentevents: [],
  dict:{},
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
    case ADDMESSAGE: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        currentevents: [...state.currentevents,payload]
      };
    } 
    case DELETE_MESSAGE: {
      
        
        //currentevents: [...state.currentevents,payload]
        console.log("message deleted!")
        console.log(payload.messageId,"this is message id")
        console.log(payload,"thiss is paylad")
        console.log(state.currentevents[payload.messageId - 1])
        state.currentevents[payload.messageId - 1] = payload;
        console.log(state.currentevents[payload.messageId - 1])
        return {
          ...state, 
        }; 
    }  
    case STATE_CONVERSATION: {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        currentevents: [...state.currentevents,payload]
      };
    }
    case STATE_DELETE: {
      console.log("message deleted!")
      console.log(payload.messageId,"this is message id")
      console.log(payload,"thiss is paylad")
      console.log(state.currentevents[payload.messageId - 1])
      state.currentevents[payload.messageId - 1] = payload;
      console.log(state.currentevents[payload.messageId - 1])
      return {
        ...state, 
      }; 
    }
    case GET_EVENTS: {
      console.log("this is current events  convo");
      console.log(payload);
      return {
        ...state,
        loading: false,
        currentevents: payload,
      };
    }
    case CURRENT_CONV: {
      console.log("this is current convo");
      console.log(payload);
      return {
        ...state,
        loading: false,
        currentconversation: payload,
      };
    }
    case GET_CONV: {
      return {
        ...state,
        loading: false,
        conversation: payload,
      };
    }
    case CONV_STATE: {
    
      console.log(payload);
      return {
        ...state,
        conversation: [payload, ...state.conversation],
      };
    }
    case ADD_CONV: {
      state.conversation = state.conversation.filter(
        (conversations) => conversations._id !== payload._id
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
        conversation: [],
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
        user: payload,
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
        user: null,
      };
    default:
      return state;
  }
}
export default authReducer;
