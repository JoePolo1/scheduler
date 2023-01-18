/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from 'react';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from "@testing-library/React";

/*
  We import the component that we are testing
*/
import Appointment from "components/Appointment";
import Confirm from "components/Appointment";
import Empty from "components/Appointment";
import Form from "components/Appointment";
import Header from "components/Appointment";
import Status from "components/Appointment";
import Show from "components/Appointment";


describe("index", () => {
  it ("Renders Appointment component without crashing", () => {
    render(<Appointment />)
  })

  it ("Renders Confirm component without crashing", () => {
    render(<Confirm />)
  })

  it ("Renders Empty component without crashing", () => {
    render(<Empty />)
  })

  it ("Renders Form component without crashing", () => {
    render(<Form />)
  })

  it ("Renders Header component without crashing", () => {
    render(<Header />)
  })

  it ("Renders Status component without crashing", () => {
    render(<Status />)
  })

  it ("Renders Show component without crashing", () => {
    render(<Show />)
  })
})


