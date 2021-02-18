import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import PropTypes from "prop-types";
import EmailIcon from "@material-ui/icons/Email";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
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
    width: 150,
    height: 30,
    fontSize: 20,
    backgroundColor: "black",
    color: "white",
  },
});
const Login = ({ isAuthenticated, formData, onChange, onSubmit }) => {
  const { email, category, password } = formData;
  const classes = useStyles();
  return (
    <Fragment>
      <center>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="border1">
          <br />
          <br />
          <br />
          <h1 className="large text-dark">Sign In</h1>
          <p className="black">
            <i className="fas fa-user"></i> Sign in your Account
          </p>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email-Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Category"
                name="category"
                value={category}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="Password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>

            {/* //<Button onClick={onSubmit} variant="contained">Default</Button> */}

            <Button
              type="submit"
              variant="contained"
              className={classes.home}
              value="login"
            >
              Sign In
            </Button>

            <br />
            <br />
          </form>
          Dont have an account?{" "}
          <Link to="/register">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              value="login"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </center>
    </Fragment>
  );
};

Login.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default Login;