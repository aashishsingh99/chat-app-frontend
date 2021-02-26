import React, { useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import { Get_Conv } from "../actions/Get_Conv";
import { Add_Conv } from "../actions/Add_Conv";
import { newConversation } from "../actions/newConversation";
import { Get_Events } from "../actions/Get_Events";
import { postMessage } from "../actions/postMessage";
import { State_conversation } from "../actions/State_conversation";
import { new_conver_state } from "../actions/new_conver_state";
import { DeleteMessage } from "../actions/DeleteMessage";
import { read_updateState } from "../actions/read_updateState";
import { EditMessage } from "../actions/EditMessage";
import { delete_message_state } from "../actions/delete_message_state";
import { edit_message_state } from "../actions/edit_message_state";
import { Show_Online } from "../actions/Show_Online";
import { setTyping } from "../actions/setTyping";
import { clearTyping } from "../actions/clearTyping";
import { save_changes_to_state } from "../actions/save_changes_to_state";
import socket from "../socketConfig";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import SearchIcon from "@material-ui/icons/Search";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";
//import moment from "moment";
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    marginTop: 20,
  },
  media: {
    marginTop: 50,
    height: 140,
  },
  ab: {
    width: 500,
    backgroundColor: "black",
    color: "white",
  },
  home: {
    topPadding: 15,
    width: 100,
    height: 20,
    fontSize: 15,
    backgroundColor: "black",
    color: "white",
  },
  icon: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  accounticon: {
    height: 50,
    width: 50,
  },
  hoverMessage: {
    padding: 10,
    marginRight: "10%",
    marginTop: "1%",
    background: "light",

    "&:hover": {
      backgroundColor: "#f7f5f5",
    },
  },
  online: {
    height: 15,
    width: 15,
    color: "green",
    margin: 2,
  },
});

const Chat = ({
  user_name,
  Get_Conv,
  Add_Conv,
  conversation,
  auth,
  newConversation,
  Get_Events,
  currentconversation,
  postMessage,
  currentevents,
  new_conver_state,
  State_conversation,
  DeleteMessage,
  delete_message_state,
  edit_message_state,
  EditMessage,
  Show_Online,
  status,
  setTyping,
  clearTyping,
  save_changes_to_state,
  read_updateState,

  typing,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setmessage] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [edit_curr, setedit_curr] = useState({});
  const fun = ({ chatid }) => {
    console.log("fun");
    console.log(chatid);
    newConversation({ chatid: chatid });
    console.log("calling get function sakshiiiiii");
    console.log(Date.now);
    Get_Events({ chatRoomId: chatid });
    Show_Online({ chat_id: chatid });
  };
  const postFun = ({ text, chatRoomId, messageId }) => {
    console.log("message send button clicked");
    postMessage({
      text: message,
      chatRoomId: currentconversation._id,
      messageId: currentevents.length + 1,
    });
  };
  //   useEffect(() => {
  //     Show_Online({chat_id:chatid});
  // },[status]);
  const fun2 = ({ curr }) => {
    console.log("inside fun222222!");
    DeleteMessage({
      text: "This message is deleted!",
      chatRoomId: currentconversation._id,
      messageId: curr.messageId,
    });
    console.log("after delete msg");

    Get_Events({ chatRoomId: currentconversation._id });
  };
  //let edit_msg="";

  const fun3 = ({ curr }) => {
    console.log("inside fun333333!");
    handleClickOpen();
    console.log("curr");
    console.log(curr);
    setedit_curr(curr);
    console.log("edit_curr", edit_curr);

    // DeleteMessage({
    //   text: "This message is deleted!",
    //   chatRoomId: currentconversation._id,
    //   messageId: curr.messageId,
    // });
    // console.log("after delete msg");

    // Get_Events({ chatRoomId: currentconversation._id });
  };
  // useEffect(() => {
  //   console.log("i am in useeffect typing");

  //   //const name = auth.user.name;
  //   // socket.on("typing", ({}) => {
  //   //   console.log("Yes he is typing");

  //   // });
  //   socket.on("typing", () => {
  //     console.log("on socket listening");
  //   })

  // }, [message]);
  useEffect(() => {
    socket.on("showTyping", ({ chat_typing_id }) => {
      // I will call it and set Timeout and call someting to clear typing

      console.log("typing");
      setTyping(chat_typing_id);
      setTimeout(() => {
        clearTyping();
      }, 3000);
    });
  }, []);
  useEffect(() => {
    socket.on("read_message", ({ chatRoomId }) => {
      // I will call it and set Timeout and call someting to clear typing

      console.log("reding message in chat.js");
      //get events
      save_changes_to_state({ chatRoomId: chatRoomId });
      //Get_Events({ chatRoomId: chatRoomId });
      //Get_Events({ chatRoomId: chatRoomId });
    });
  }, []);
  const fun4 = ({ e }) => {
    if (currentconversation !== null) {
      let chat_typing_id = currentconversation._id;
      socket.emit("typing", { chat_typing_id });
    }
    //UserSocket[req.user.name].in(chatRoomId).emit("edit_message", { event:event2 });
    //console.log("afteer emit typing")
    setmessage(e.target.value);

    //console.log(e.target.value,"e inside fun4");
    //socket.to(currentconversation._id).emit("typing","useris typing");

    // socket.emit("typing", {  }, (error) => {
    //   console.log("emitting typing",({}));
    //   if (error) {
    //     alert(error);
    //   }
    // });
  };
  const handleEditMessage = () => {
    console.log("editmessage", editmessage);
    console.log(edit_curr);
    handleClose();
    const text = edit_curr.text;
    const chatRoomId = edit_curr.chatRoomId;
    const messageId = edit_curr.messageId;
    const updatedText = editmessage;
    console.log("everything");
    console.log(text, chatRoomId, messageId, updatedText);
    EditMessage({ text, chatRoomId, messageId, updatedText });
  };

  useEffect(() => {
    console.log("i am useeffect");
    //const name = auth.user.name;
    Get_Conv({ user_name: user_name });
  }, []);
  useEffect(() => {
    if (auth.user.name !== undefined && conversation.length > 0) {
      const me = auth.user.name;
      console.log("AAAAAAAA", me);
      socket.emit("join", { me, conversation }, (error) => {
        if (error) {
          alert(error);
        }
      });
    }
  }, [auth, conversation]);

  useEffect(() => {
    socket.on("newConversation", ({ newConvo }) => {
      console.log("YES YAAR");
      console.log(newConvo, "new conversation");
      new_conver_state(newConvo);
    });
  }, []);

  useEffect(() => {
    socket.on("new_message", ({ event }) => {
      console.log("message new");
      const text = event.text;
      const chatRoomId = event.chatRoomId;
      const messageId = event.messageId;
      State_conversation({ event });

      if (
        currentconversation !== null &&
        currentconversation._id === event.chatRoomId
      ) {
        console.log(
          currentconversation !== null &&
            currentconversation._id === event.chatRoomId
        );
        console.log(currentconversation, "currentconver");
        console.log(currentconversation._id, "c");
        console.log(event.chatRoomId, "id");
      } else {
        //send notification of new event
      }
    });
  }, [currentconversation]);
  useEffect(() => {
    socket.on("delete_message", ({ event }) => {
      console.log("chat component HEYY");
      const text = event.text;
      const chatRoomId = event.chatRoomId;
      const messageId = event.messageId;
      if (currentconversation && currentconversation._id === event.chatRoomId) {
        delete_message_state({ event });
      } else {
        //send notification of new event
      }
    });
  }, [currentconversation]);

  useEffect(() => {
    socket.on("edit_message", ({ event }) => {
      console.log("chat component HEYY eidting");
      const text = event.text;
      const chatRoomId = event.chatRoomId;
      const messageId = event.messageId;
      console.log("everything in edit", text, chatRoomId, messageId);
      if (currentconversation && currentconversation._id === event.chatRoomId) {
        edit_message_state(event);
      } else {
        //send notification of new event
      }
    });
  }, [currentconversation]);

  const [contacts, setContacts] = useState([]);

  const [temp2, settemp2] = useState("");
  const [editmessage, seteditmessage] = useState("");
  // const [message, setmessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setContacts((con) => [...con, temp2]);
    //search.value="";
    document.getElementById("outlined-basic-email").value = "";

    //add conv
    Add_Conv({ user_name: temp2 });

    console.log("calling get");
    //Get_Conv({ user_name: user_name });
    //console.log("on click");
  };

  //console.log("hello everybody");

  const classes = useStyles();

  return (
    <div style={{ "padding-top": "20px" }}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h5" className="header-message"></Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key={user_name}>
              <ListItemIcon>
                <AccountCircleIcon className={classes.accounticon} />
              </ListItemIcon>
              {/* <ListItemText primary={user_name} style={{"font":"50px"}}></ListItemText> */}
              <h2>{user_name}</h2>{" "}
              <FiberManualRecordIcon
                className={classes.online}
              ></FiberManualRecordIcon>
            </ListItem>
          </List>

          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              name="search"
              id="outlined-basic-email"
              label="Enter User Name..."
              variant="outlined"
              onChange={(e) => settemp2(e.target.value)}
              fullWidth
            />

            {/* <Button 
              type="submit"
              variant="contained"
              className={classes.home}
              value="login"
              onClick={onSubmit}
            >
              Search
            </Button> */}
            <SearchIcon
              style={{ position: "relative", left: "200px", bottom: "40px" }}
              className={classes.icon}
              onClick={onSubmit}
            ></SearchIcon>
          </Grid>
          <Divider />
          <List>
            {!conversation.length ? (
              <h1>No Contacts Found</h1>
            ) : (
              conversation.map((x) => (
                // console.log(x._id)
                <Fragment>
                  <ListItem
                    button
                    onClick={(e) => fun({ chatid: x._id })}
                    key={
                      x.recipients[0].name === auth.user.name
                        ? x.recipients[1].name
                        : x.recipients[0].name
                    }
                  >
                    <ListItemIcon>
                      <PersonAddIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        x.recipients[0].name === auth.user.name
                          ? x.recipients[1].name
                          : x.recipients[0].name
                      }
                    >
                      {x.recipients[0].name === auth.user.name
                        ? x.recipients[1].name
                        : x.recipients[0].name}
                    </ListItemText>
                  </ListItem>
                </Fragment>
              ))
            )}
          </List>
        </Grid>

        <Grid item xs={9}>
          <Grid style={{ background: "#D3D3D3", padding: "5px" }}>
            <h2>
              {currentconversation && currentconversation.recipients
                ? currentconversation.recipients[1].name === auth.user.name
                  ? currentconversation.recipients[0].name
                  : currentconversation.recipients[1].name
                : ""}
            </h2>
            {console.log(currentconversation, "curr_CONVERSATION")}
            {currentconversation !== null ? (
              <p>
                {status ? "Online" : "Offline"}
                <FiberManualRecordIcon
                  className={classes.online}
                  style={{ position: "relative", top: "5px" }}
                ></FiberManualRecordIcon>
              </p>
            ) : (
              ""
            )}
            {currentconversation
              ? currentconversation._id === typing && <span>typing...</span>
              : ""}
          </Grid>
          <Grid>
            <List className={classes.messageArea}>
              {currentevents.length > 0 &&
                currentevents.map((curr) => (
                  <Fragment>
                    <Grid className={classes.hoverMessage}>
                      <ListItem>
                        <Grid container>
                          <Grid item xs={12}>
                            {curr.sender !== auth.user._id && (
                              <ListItemText
                                align="left"
                                primary={curr.text}
                                secondary={curr.date.substr(11, 5)}

                                //{curr?(curr.read?(<DoneAllIcon></DoneAllIcon>):(<DoneIcon></DoneIcon>)):(Loading)}
                                //secondary={moment(curr.date).format("LT")}
                              ></ListItemText>
                            )}
                            {curr.sender === auth.user._id && (
                              <Fragment>
                                <Grid container>
                                  <Grid item xs={11}>
                                    <ListItemText
                                      align="right"
                                      primary={curr.text}
                                      secondary={curr.date.substr(11, 5)}
                                    ></ListItemText>
                                  </Grid>
                                  <Grid item xs={1}>
                                    {curr ? (
                                      curr.read === "true" ? (
                                        <DoneAllIcon></DoneAllIcon>
                                      ) : (
                                        <DoneIcon></DoneIcon>
                                      )
                                    ) : (
                                      "Loading"
                                    )}
                                    <DeleteIcon
                                      className={classes.icon}
                                      // onClick={(e) =>
                                      //   DeleteMessage({
                                      //     text: "This message is deleted!",
                                      //     chatRoomId: currentconversation._id,
                                      //     messageId: curr.messageId,
                                      //   })
                                      // }
                                      //onClick={(e) => fun({ chatid: x._id })}
                                      onClick={(e) => fun2({ curr: curr })}
                                      style={{
                                        position: "absolute",
                                        top: "10px",
                                      }}
                                    ></DeleteIcon>
                                    <EditIcon
                                      className={classes.icon}
                                      style={{
                                        position: "absolute",
                                        top: "10px",
                                        right: "1px",
                                      }}
                                      onClick={(e) => fun3({ curr: curr })}
                                    ></EditIcon>
                                  </Grid>
                                </Grid>
                              </Fragment>
                            )}
                          </Grid>
                          <Grid item xs={12}>
                            <ListItemText align="right"></ListItemText>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>
                  </Fragment>
                ))}
            </List>
          </Grid>
          <Divider />
          {currentconversation !== null ? (
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Write a Message"
                  fullWidth
                  onChange={(e) => fun4({ e })}
                />
              </Grid>
              <Grid xs={1} align="right">
                <Fab
                  style={{ background: "black" }}
                  onClick={(e) =>
                    postFun({
                      text: message,
                      chatRoomId: currentconversation._id,
                      messageId: currentevents.length + 1,
                    })
                  }
                  color="primary"
                  aria-label="add"
                >
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Grid>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>Edit your message here:</DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Type here ..."
              value={editmessage}
              onChange={(e) => seteditmessage(e.target.value)}
              type="text"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleEditMessage} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};
Chat.propTypes = {
  user_name: PropTypes.string,
  Get_Conv: PropTypes.func.isRequired,
  Add_Conv: PropTypes.func.isRequired,
  conversation: PropTypes.object.isRequired,
  Get_Events: PropTypes.func.isRequired,
  currentconversation: PropTypes.object.isRequired,
  postMessage: PropTypes.func.isRequired,
  currentevents: PropTypes.object.isRequired,
  new_conver_state: PropTypes.func.isRequired,
  EditMessage: PropTypes.func.isRequired,
  edit_message_state: PropTypes.func.isRequired,
  Show_Online: PropTypes.func.isRequired,
  status: PropTypes.func.isRequired,
  setTyping: PropTypes.func.isRequired,
  clearTyping: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  conversation: state.auth.conversation,
  auth: state.auth,
  currentconversation: state.auth.currentconversation,
  currentevents: state.auth.currentevents,
  status: state.auth.status,
  typing: state.auth.typing,
});

export default connect(mapStateToProps, {
  Get_Conv,
  Add_Conv,
  newConversation,
  Get_Events,
  postMessage,
  new_conver_state,
  State_conversation,
  DeleteMessage,
  delete_message_state,
  edit_message_state,
  EditMessage,
  Show_Online,
  setTyping,
  clearTyping,
  read_updateState,
  save_changes_to_state,
})(Chat);
