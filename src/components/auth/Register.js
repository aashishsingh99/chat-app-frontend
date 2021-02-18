import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
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
const Register = ({ isAuthenticated, onChange, onSubmit, formData }) => {
  const { name, email, category, password, password2 } = formData;
  const classes = useStyles();
  return (
    <Fragment>
      <center>
        <br />
        <br />
        <br />

        <div className="border1">
          <br />
          <br />
          <br />
          <h1 className="large text-dark">Sign Up</h1>
          <p className="black">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="category"
                name="category"
                value={category}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                minLength="6"
                value={password}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                minLength="6"
                value={password2}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <Button
              type="submit"
              variant="contained"
              className={classes.home}
              value="login"
              onClick={onSubmit}
            >
              Register
            </Button>
            <br />
            <br />
          </form>
          <p className="whitblacke">
            Already have an account?{" "}
            <Link to="/login">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                value="login"
              >
                Sign In
              </Button>
            </Link>
          </p>
        </div>
      </center>
    </Fragment>
  );
};
Register.propTypes = {
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
export default Register;