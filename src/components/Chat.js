import React from "react";
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

const Chat = ({ user_name, Get_Conv, Add_Conv, conversation }) => {
  const [contacts, setContacts] = useState([]);

  const [temp2, settemp2] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setContacts((con) => [...con, temp2]);
    //search.value="";
    document.getElementById("outlined-basic-email").value = "";
    //add conv
    Add_Conv({ user_name: temp2 });
    console.log("calling get");
    Get_Conv({ user_name: user_name });
    console.log("on click");
  };

  console.log("hello everybody");

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
                <ListItem button key={x.recipients[1].name}>
                  <ListItemIcon>
                    <PersonAddIcon />
                  </ListItemIcon>
                  <ListItemText primary={x.recipients[1].name}>{x.recipients[1].name}</ListItemText>
                </ListItem>
              ))
            )}
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Hey man, What's up ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="left"
                    primary="Hey, Iam Good! What about you ?"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText
                    align="right"
                    primary="Cool. i am good, let's catch up!"
                  ></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{ padding: "20px" }}>
            <Grid item xs={11}>
              <TextField
                id="outlined-basic-email"
                label="Type Something"
                fullWidth
              />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add">
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
};
const mapStateToProps = (state) => ({
  conversation: state.auth.conversation,
});

export default connect(mapStateToProps, { Get_Conv, Add_Conv })(Chat);
