import React from "react";
import { Link } from "react-router-dom";
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
    height: 50,
    fontSize: 25,
    backgroundColor: "black",
    color: "white",
  },
});
const Landing = () => {
  const classes = useStyles();
  return (
    <section className="landing">
      <div className="landing-inner">
        <div className="stripe">
          {" "}
          <br />
          <h1 className="x-large">Hyper Tribe </h1>
          <p className="lead">Lets explore!</p>
          {/* <Button
            type="submit"
            variant="contained"
            color="secondary"
            value="login"
          >
            Register
          </Button>  */}
          <div className="buttons">
            <Link to="/register">
              <Button className={classes.home}>Sign Up </Button>
            </Link>

            {"  "}

            <Link to="/login">
              <Button className={classes.home}>Login </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;