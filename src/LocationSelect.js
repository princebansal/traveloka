import React from "react";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  select: {
    display: "block"
  }
});

class LocationSelect extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <label>{this.props.labelType}</label>
        <select
          className={classes.select}
          onChange={this.props.onChange}
          value={this.props.location}
          loc={this.props.location}
          aria-label={this.props.labelType}
        >
          {this.props.children}
          {this.props.placeMapping.map(obj => (
            <option value={obj} key={obj}>
              {obj === "None" ? this.props.noneLabel : obj}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default withStyles(styles)(LocationSelect);
