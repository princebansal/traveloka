import React from "react";
import Main from "../src/Main";
import { render, fireEvent, cleanup } from "react-testing-library";
import placeMapping from "../src/testData.js";
import sinon from "sinon";

afterEach(cleanup);

describe("<Main/>", () => {
  it("Departure and arrival are initially set to None", () => {
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const dep = getByLabelText(/Departure/i);
    const arr = getByLabelText(/Arrival/i);

    expect(dep.getAttribute("loc")).toEqual("None");
    expect(arr.getAttribute("loc")).toEqual("None");
  });
  it("Arrival has only default 1 option and departure has all city options", () => {
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const dep = getByLabelText(/Departure/i);
    const arr = getByLabelText(/Arrival/i);
    expect(dep.children.length).toEqual(Object.keys(placeMapping).length);
    expect(arr.children.length).toEqual(1);
  });
  it("when selecting departure, departure value updates", () => {
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const dep = getByLabelText(/Departure/i);
    expect(dep.children.length).toEqual(Object.keys(placeMapping).length);

    fireEvent.change(dep, { target: { value: "Mumbai" } });

    expect(dep.getAttribute("loc")).toEqual("Mumbai");
  });
  it("when selecting departure, arrival options update as per mapping", () => {
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const dep = getByLabelText(/Departure/i);
    const arr = getByLabelText(/Arrival/i);

    fireEvent.change(dep, { target: { value: "Mumbai" } });
    const arrChildren = arr.children;
    const expectedChildren = placeMapping["Mumbai"];
    for (var i = 0; i < arrChildren.length; i++) {
      var val = arrChildren.item(i).value;
      if (val === "None") {
        continue;
      }
      expect(expectedChildren).toContain(arrChildren.item(i).value);
    }
  });
  it("when selecting arrival, arrival value updates", () => {
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const dep = getByLabelText(/Departure/i);
    expect(dep.children.length).toEqual(Object.keys(placeMapping).length);
    fireEvent.change(dep, { target: { value: "Mumbai" } });

    const arr = getByLabelText(/Arrival/i);

    fireEvent.change(arr, { target: { value: placeMapping["Mumbai"][1] } });

    expect(arr.getAttribute("loc")).toEqual("Kolkata");
  });
  it("when departure is changed, arrival value resets if it doesn't match with departure map else it remains the same", () => {
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const dep = getByLabelText(/Departure/i);
    expect(dep.children.length).toEqual(Object.keys(placeMapping).length);
    fireEvent.change(dep, { target: { value: "Mumbai" } });

    const arr = getByLabelText(/Arrival/i);

    fireEvent.change(arr, { target: { value: placeMapping["Mumbai"][1] } });

    expect(arr.getAttribute("loc")).toEqual("Kolkata");

    var arrVal = arr.getAttribute("loc");
    fireEvent.change(dep, { target: { value: "Gwalior" } });

    if (placeMapping["Gwalior"].indexOf(arrVal) > 0) {
      expect(arr.getAttribute("loc")).toEqual(arrVal);
    } else {
      expect(arr.getAttribute("loc")).toEqual("None");
    }
  });
  it("date shouldn't be less than today", () => {
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const datePicker = getByLabelText(/journeyDatePicker/i).querySelector(
      "input"
    );
    console.log("Datepicker value: " + datePicker.value);
    var todaysDate = getTodaysDate();
    expect(datePicker.value).toEqual(todaysDate);
  });

  it("when click proceed button, toast should fire if form is invalid and redirect to /flights if successful", () => {
    sinon.stub(window.location, "assign");
    sinon.stub(window.location, "replace");
    const { queryByLabelText, getByLabelText } = render(<Main />);

    const proceedButton = document.querySelector("button");
    fireEvent.click(proceedButton);
    var toast = document.getElementById("message-id");
    expect(toast).toBeTruthy();
    const dep = getByLabelText(/Departure/i);
    fireEvent.change(dep, { target: { value: "Mumbai" } });

    const arr = getByLabelText(/Arrival/i);

    fireEvent.change(arr, { target: { value: placeMapping["Mumbai"][1] } });
    window.location.replace = jest.fn();
    fireEvent.click(proceedButton);
    expect(window.location.replace).toHaveBeenCalledWith("/flights");
  });
});

function getTodaysDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}
