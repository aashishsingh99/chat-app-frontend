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
  EDIT_MESSAGE,
  STATE_EDIT,
  SHOW_ONLINE,
  SET_READ,
  SET_TYPING,
  CLEAR_TYPING,
  READ_CONV,
} from "../actions/types";
import socket from "../socketConfig";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  category: null,
  conversation: [],
  currentconversation: null,
  currentevents: [],
  dict: {},
  status: null,
  typing: null,
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
        currentevents: [...state.currentevents, payload],
      };
    }

    case SHOW_ONLINE: {
      return {
        ...state,
        isAuthenticated: true,
        status: payload,
      };
    }
    case DELETE_MESSAGE: {
      //currentevents: [...state.currentevents,payload]
      console.log("message deleted!");
      console.log(payload.messageId, "this is message id");
      console.log(payload, "thiss is paylad");
      console.log(state.currentevents[payload.messageId - 1]);
      state.currentevents[payload.messageId - 1] = payload;
      console.log(state.currentevents[payload.messageId - 1]);
      return {
        ...state,
      };
    }
    case EDIT_MESSAGE: {
      //currentevents: [...state.currentevents,payload]
      console.log("message edited!");
      console.log(payload.messageId, "this is message id");
      console.log(payload, "thiss is paylad");
      console.log(state.currentevents[payload.messageId - 1]);
      state.currentevents[payload.messageId - 1] = payload;
      console.log(state.currentevents[payload.messageId - 1]);
      return {
        ...state,
      };
    }
    case STATE_CONVERSATION: {
     
      if (
        state.currentconversation !== null &&
        state.currentconversation._id === payload.chatRoomId
      ) {
        socket.emit("new_read_message", {
          chatRoomId: state.currentconversation._id,
        });
        console.log("running if in reducer");
        console.log(state.currentconversation, "jio");
        console.log(payload, "payload");
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          currentevents: [...state.currentevents, payload],
        };
      } else {
        console.log("running else in reducer");
        //send notification of new event
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
        };
      }
    }
    case STATE_DELETE: {
      console.log("message deleted!");
      console.log(payload.messageId, "this is message id");
      console.log(payload, "thiss is paylad");
      console.log(state.currentevents[payload.messageId - 1]);
      state.currentevents[payload.messageId - 1] = payload;
      console.log(state.currentevents[payload.messageId - 1]);
      return {
        ...state,
      };
    }
    case STATE_EDIT: {
      console.log("message edited!");
      console.log(payload.messageId, "this is message id");
      console.log(payload, "thiss is paylad");
      console.log(state.currentevents[payload.messageId - 1]);
      state.currentevents[payload.messageId - 1] = payload;
      console.log(state.currentevents[payload.messageId - 1]);
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
    case READ_CONV: {
      console.log("this is read conv reducer");
      console.log(payload);
      return {
        ...state,
        loading: false,
        currentevents: payload,
      };
    }
    case SET_READ: {
      for (let i = 0; i < state.currentevents.length; i++) {
        state.currentevents[i].read = "true";
      }
      return {
        ...state,
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
    case SET_TYPING:
      return {
        ...state,
        typing: payload,
      };
    case CLEAR_TYPING:
      return {
        ...state,
        typing: null,
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
