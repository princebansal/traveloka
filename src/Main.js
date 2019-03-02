import React from "react";
import placeMapping from "./testData.js";
import LocationSelect from "./LocationSelect.js";
import { createBrowserHistory } from "history";
import {
  Grid,
  Paper,
  withStyles,
  TextField,
  Button,
  Snackbar
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";

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
  },
  rightAlignBox: {
    textAlign: "end"
  },
  leftAlignBox: {
    textAlign: "left"
  },
  button: {
    textAlign: "right"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  input: {
    padding: "20px",
    display: "block",
    textAlign: "left"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      departure: "None",
      arrival: "None",
      selectedDate: today,
      snackBarOpen: false
    };
  }

  onDepartureChange = e => {
    console.log(e.target.value);
    var dep = e.target.value;
    var stateObj = { departure: dep };
    if (placeMapping[dep].indexOf(this.state.arrival) < 0) {
      stateObj["arrival"] = "None";
    }
    this.setState(stateObj);
  };

  onJourneyDateChange = date => {
    console.log(date);
    this.setState({ selectedDate: date });
  };

  onArrivalChange = e => {
    console.log(e.target.value);
    this.setState({ arrival: e.target.value });
  };

  handleProceed = () => {
    this.setState({ snackBarOpen: false });
    if (this.state.departure && this.state.arrival && this.state.selectedDate) {
      if (this.state.departure != "None" && this.state.arrival != "None") {
        window.location.replace("/flights");
        createBrowserHistory().push("/");
        return;
      }
    }

    this.setState({ snackBarOpen: true });
  };
  handleSnackbarClose = (event, reason) => {
    console.log("snackbar close " + reason);
    if (reason === "clickaway") {
      return;
    }

    this.setState({ snackBarOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.box}>
          <Grid container spacing={24}>
            <Grid item container xs={12}>
              <Grid item xs={12} md={6} lg={6} className={classes.input}>
                <LocationSelect
                  onChange={this.onDepartureChange}
                  location={this.state.departure}
                  noneLabel="Select Departure"
                  placeMapping={Object.keys(placeMapping)}
                  labelType="Departure"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6} className={classes.input}>
                <LocationSelect
                  onChange={this.onArrivalChange}
                  location={this.state.arrival}
                  noneLabel="Select arrival"
                  placeMapping={placeMapping[this.state.departure]}
                  labelType="Arrival"
                >
                  <option value="None">Select arrival</option>
                </LocationSelect>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  label="Journey date"
                  value={this.state.selectedDate}
                  disablePast
                  format="dd/MM/yyyy"
                  views={["year", "month", "day"]}
                  onChange={this.onJourneyDateChange}
                  aria-label="journeyDatePicker"
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} className={classes.button}>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleProceed}
              >
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={this.state.snackBarOpen}
          onClose={this.handleSnackbarClose}
          autoHideDuration={3000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">Invalid details</span>}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
