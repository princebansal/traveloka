import React from "react";
import LocationSelect from "./LocationSelect.js";
import { createBrowserHistory } from "history";
import { Grid, Paper, withStyles, Button, Snackbar } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import DateFnsUtils from "@date-io/date-fns";
import { changeDeparture, changeArrival, loadPlaces } from "./actions/index";
import uuidv1 from "uuid";
import { connect } from "react-redux";

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

const mapStateToProps = state => {
  return {
    departure: state.departure,
    arrival: state.arrival,
    placesMapping: state.placesMapping,
    placesMappingStatus: state.placesMappingStatus
  };
};
function mapDispatchToProps(dispatch) {
  return {
    changeDeparture: departure => dispatch(changeDeparture(departure)),
    changeArrival: arrival => dispatch(changeArrival(arrival)),
    loadPlaces: () => dispatch(loadPlaces())
  };
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      selectedDate: today,
      snackBarOpen: false
    };
  }

  componentDidMount() {
    this.props.loadPlaces();
  }

  onDepartureChange = e => {
    var dep = e.target.value;
    const id = uuidv1();
    this.props.changeDeparture({ departure: dep, id });
  };

  onJourneyDateChange = date => {
    console.log(date);
    this.setState({ selectedDate: date });
  };

  onArrivalChange = e => {
    const id = uuidv1();
    this.props.changeArrival({ arrival: e.target.value, id });
  };

  handleProceed = () => {
    this.setState({ snackBarOpen: false });
    if (this.props.departure && this.props.arrival && this.state.selectedDate) {
      if (this.props.departure !== "None" && this.props.arrival !== "None") {
        window.location.replace("/flights");
        createBrowserHistory().push("/flights");
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
    const { classes, departure, arrival, placesMapping } = this.props;
    return (
      <div className={classes.root}>
        <Paper className={classes.box}>
          {this.props.placesMappingStatus ? (
            <Grid container spacing={24}>
              <Grid item container xs={12}>
                <Grid item xs={12} md={6} lg={6} className={classes.input}>
                  <LocationSelect
                    onChange={this.onDepartureChange}
                    location={departure}
                    noneLabel="Select Departure"
                    placeMapping={Object.keys(placesMapping)}
                    labelType="Departure"
                  />
                </Grid>

                <Grid item xs={12} md={6} lg={6} className={classes.input}>
                  <LocationSelect
                    onChange={this.onArrivalChange}
                    location={arrival}
                    noneLabel="Select arrival"
                    placeMapping={placesMapping[this.props.departure]}
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
          ) : (
            <p>Failed to load flights</p>
          )}
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

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main)
);
