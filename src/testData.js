var placesMapping = {
  None: [],
  Mumbai: [
    "New Delhi",
    "Kolkata",
    "Bangalore",
    "Pune",
    "Hyderabad",
    "Indore",
    "Gwalior",
    "Chennai"
  ],
  "New Delhi": [
    "Mumbai",
    "Kolkata",
    "Bangalore",
    "Pune",
    "Hyderabad",
    "Indore",
    "Gwalior",
    "Chennai",
    "Agra",
    "Chandigarh",
    "Ahemdabad",
    "Guwahati"
  ],
  Kolkata: ["Mumbai", "New Delhi", "Bangalore", "Pune", "Hyderabad", "Chennai"],
  Bangalore: [
    "Mumbai",
    "Kolkata",
    "New Delhi",
    "Pune",
    "Hyderabad",
    "Indore",
    "Chennai",
    "Chandigarh",
    "Ahemdabad"
  ],
  Pune: [
    "Mumbai",
    "Kolkata",
    "Bangalore",
    "New Delhi",
    "Hyderabad",
    "Indore",
    "Chennai"
  ],
  Hyderabad: ["Mumbai", "Kolkata", "Bangalore", "Pune", "New Delhi", "Chennai"],
  Indore: ["New Delhi", "Mumbai", "Gwalior", "Chennai", "Ahemdabad"],
  Gwalior: ["New Delhi", "Mumbai", "Indore", "Agra"],
  Chennai: [
    "New Delhi",
    "Mumbai",
    "Kolkata",
    "Bangalore",
    "Pune",
    "Hyderabad",
    "Chandigarh",
    "Ahemdabad",
    "Guwahati"
  ],
  Agra: ["New Delhi", "Gwalior"],
  Chandigarh: ["New Delhi", "Mumbai", "Kolkata", "Bangalore"],
  Ahemdabad: [
    "New Delhi",
    "Mumbai",
    "Kolkata",
    "Bangalore",
    "Pune",
    "Hyderabad"
  ],
  Guwahati: ["New Delhi", "Kolkata", "Bangalore"]
};
export default placesMapping;
