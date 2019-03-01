import React from "react";
import { Paper, withStyles, Typography } from "@material-ui/core";

const styles = theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
    padding: "20px"
  },
  box: {
    display: "inline-block",
    padding: "20px",
    textAlign: "left"
  }
});

class FlightListMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.box}>
          <Typography variant="h6">Flight List Page</Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(FlightListMain);
