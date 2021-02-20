import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import Present_login from "../../components/auth/Login";
const io = require("socket.io-client");
// const socket = io();
const temp="http://LocalHost:5000"
const socket = io(temp, { transports: ["websocket"] });

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async (e) => {
    e.preventDefault();
    login({ email: email, password: password });
    console.log("Success");
  };
  //redirect if logged in

  if (isAuthenticated) {
    return <Redirect to="/chat" />;
  }

  return (
    <Present_login
      isAuthenticated={isAuthenticated}
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
