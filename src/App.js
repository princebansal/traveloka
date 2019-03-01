import React, { Component } from "react";
import Main from "./Main";
import FlightList from "./FlightList";
import { BrowserRouter, Route } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/flights" component={FlightList} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
