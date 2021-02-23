import React, { useEffect,Fragment } from "react";
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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
import socket from "../socketConfig";





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
}) => {
  const fun = ({ chatid }) => {
    console.log("fun");
    console.log(chatid);
    newConversation({ chatid: chatid });
    console.log("calling get function sakshiiiiii");
    console.log(Date.now);
    Get_Events({ chatRoomId: chatid });
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

  useEffect(()=>{
    socket.on("new_message",({event})=>{
      console.log("message new")
      const text = event.text 
      const chatRoomId=event.chatRoomId
      const messageId=event.messageId
      if (currentconversation && currentconversation._id === event.chatRoomId) {
         State_conversation({event});
      } else {
        //send notification of new event
      }
      
      
    })
  },[currentconversation])

  const [contacts, setContacts] = useState([]);

  const [temp2, settemp2] = useState("");
  const [message, setmessage] = useState("");

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
    <div>
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
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={user_name}></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Grid item xs={12} style={{ padding: "10px" }}>
            <TextField
              name="search"
              id="outlined-basic-email"
              label="Enter User_Name"
              variant="outlined"
              onChange={(e) => settemp2(e.target.value)}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              className={classes.home}
              value="login"
              onClick={onSubmit}
            >
              Search
            </Button>
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
                  key={x.recipients[0].name===auth.user.name ?  x.recipients[1].name:x.recipients[0].name}
                >
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary={x.recipients[0].name===auth.user.name ?  x.recipients[1].name:x.recipients[0].name}>
                    {x.recipients[0].name===auth.user.name ?  x.recipients[1].name:x.recipients[0].name}
                  </ListItemText>
                </ListItem>
                </Fragment>
              ))
            )}
          </List>
        </Grid>

        <Grid item xs={9}>
          <List className={classes.messageArea}>
            {currentevents.length &&
              currentevents.map((curr) => (
              <Fragment> 
                <Grid>
                
                
                <ListItem>
                  <Grid container>
                    <Grid item xs={12}>
                      {curr.sender !== auth.user._id && (
                        <ListItemText
                          align="left"
                          
                          
                          primary={curr.text}
                          
                          secondary={curr.date.substr(11, 5)}
                         
                        ></ListItemText>
                      )}
                      {curr.sender === auth.user._id && (
                        <Fragment>
                          <Grid container>
                            
                        <Grid item xs={11}>
                        <ListItemText
                          align="right"
                          primary={curr.text }
                          secondary={curr.date.substr(11, 5)}
                        ></ListItemText>
                        </Grid>
                        <Grid item xs={1}>
                        <DeleteIcon style={{"position":"absolute","top":"10px"}}></DeleteIcon>
                        <EditIcon style={{"position":"absolute","top":"10px","right":"25px"}}></EditIcon>
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
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Write a Message"
                fullWidth
                onChange={(e) => setmessage(e.target.value)}
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab
                onClick={(e) =>
                  postMessage({
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
        </Grid>
      </Grid>
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
};
const mapStateToProps = (state) => ({
  conversation: state.auth.conversation,
  auth: state.auth,
  currentconversation: state.auth.currentconversation,
  currentevents: state.auth.currentevents,
});

export default connect(mapStateToProps, {
  Get_Conv,
  Add_Conv,
  newConversation,
  Get_Events,
  postMessage,
  new_conver_state,
  State_conversation,
})(Chat);
