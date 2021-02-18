import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PersonIcon from "@material-ui/icons/Person";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Redirect } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginTop: 20,
    maxHeight: 600,
  },
  a: {
    height: 50,
    fontSize: 30,
    width: 250,
    backgroundColor: "black",
    color: "white",
  },
});
const Dashboard = ({ category }) => {
  const classes = useStyles();
  if (category == "admin") {
    return (
      <Fragment>
        {" "}
        <Fragment>
          <br />
          <br />
          <br />
          <center>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  <h2 className="large">
                    <PersonIcon fontSize="large" /> Welcome Admin
                  </h2>
                  <br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <Link to="/addbus">
                    <Button className={classes.a}>Add bus</Button>
                  </Link>
                  <br /> <br />
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                  <br />
                  <br />
                </Typography>
              </CardContent>
            </Card>

            <br />
          </center>
        </Fragment>
        <br /> <br />
        <Fragment>
          <center></center>
        </Fragment>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {}

        <Fragment>
          <br />
          <br />
          <br />
          <center></center>
        </Fragment>
      </Fragment>
    );
  }
};

Dashboard.propTypes = {
  category: PropTypes.string,
};

export default Dashboard;
