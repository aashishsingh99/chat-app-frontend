import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import Present_register from "../../components/auth/Register";
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    password: "",
    password2: "",
  });
  const { name, email, category, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = (e) => {
    console.log("hi");
    e.preventDefault();
    if (password !== password2) setAlert("Passwords dont match", "danger");
    else register({ name, email, category, password });
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Present_register
      isAuthenticated={isAuthenticated}
      onChange={onChange}
      onSubmit={onSubmit}
      formData={formData}
    />
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
