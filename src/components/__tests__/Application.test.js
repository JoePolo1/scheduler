import React from "react";

import { render, cleanup, waitForElement, fireEvent, getByText, getByAltText, getByPlaceholderText, getAllByTestId, prettyDOM } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {

  it("Changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });



  // it("Loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
  //   const { container } = render(<Application />);

  //   await waitForElement(() => getByText(container, "Archie Cohen"));

  //   const appointments = getAllByTestId(container, "appointment");
  //   console.log(prettyDOM(appointments));

  //   const appointment = getAllByTestId(container, "appointment")[0];
  //   console.log(prettyDOM(appointment));

  //   // Click the add button on the first empty appointment
  //   fireEvent.click(getByAltText(appointment, "Add"));

  //   // Click on the input field for tyhe student name
  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });
  //   // Add a new name in the student name input
  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  //   // Click on save
  //   fireEvent.click(getByText(appointment, "Save"));

  //   console.log(prettyDOM(container));
  // })

  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);
  
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
  
    fireEvent.click(getByAltText(appointment, "Add"));
  
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  
    fireEvent.click(getByText(appointment, "Save"));
  
    console.log(prettyDOM(appointment));
  });

});


