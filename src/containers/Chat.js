import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Chat1 from "../components/Chat";

const Chat = ({ user_name }) => {
  console.log("inside chat container");
  console.log(user_name);
//   const onSubmit = async (e) => {
//     e.preventDefault();

//     console.log("on click");
//   };
  //redirect if logged in

  return <Chat1 user_name={user_name}  />;
};
Chat.propTypes = {
  user_name: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user_name: state.auth.user.name,
});

export default connect(mapStateToProps, {})(Chat);
