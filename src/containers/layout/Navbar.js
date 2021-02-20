import { React, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DirectionsBusIcon from "@material-ui/icons/DirectionsBus";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { logout } from "../../actions/auth";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
const NavBar = ({ getbuses, logout, auth: { isAuthenticated, loading } }) => {
  
  const authLinks = (
    <ul>
      <li>
        {/* <Link to="/Buses">
          <DirectionsBusIcon fontSize="large" />
        </Link> */}
      </li>
      <li>
        <a onClick={logout} href="/login">
          {/* <i className="fas fa-sign-out-alt" /> */}
          {""}
          <span className="hide-sm">
            <ExitToAppIcon fontSize="large" />
          </span>
        </a>
      </li>
    </ul>
  );
  
  const guestLinks = (
    <ul>
      <ul>
        <li>
          <Link to="/register">
            <PersonAddIcon fontSize="large" />
          </Link>
        </li>

        <li>
          <Link to="/login">
            <AccountCircleIcon fontSize="large" />
          </Link>
        </li>
      </ul>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      {" "}
      <Link to="/">
        <h1 className="large1">
          {" "}
          <i className="fas fa-code" />
          Hyper Tribe{" "}
        </h1>
      </Link>
      <h1> </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(NavBar);
