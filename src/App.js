import React, { Component } from "react";
import Main from "./Main";
import FlightList from "./FlightList";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
class App extends Component {
  render() {
    return (
      <Router history={createBrowserHistory()}>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/flights" component={FlightList} />
        </div>
      </Router>
    );
  }
}

export default App;
