import axios from "axios";
import { useState, useEffect } from "react";
// import updateSpots from "../helpers/updateSpots";


// Helper hook for application data loading
export default function useApplicationData() {
  // Store all states in a single obj
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const updateSpots = function (state, appointments) {
    // identify the day ion question using the FIND method
    const dayObj = state.days.find(d => d.name === state.day);

    // This then counts the NULL appointments to determine how many spots exist in a day. 
    // It uses ++ to add to the number of spots starting from zero as it loops through.
    let spots = 0;
    for (const id of dayObj.appointments) {
      const appointment = appointments[id];
      console.log("appointments/id is ", appointments);
      if (!appointment.interview) {
        spots++;
      }
    }

    // adds the new value of spots back to the day object without mutating state directly, by returning 
    // it via the MAP method (targeting the day in question only using ternary) 
    // which creates a copy array as opposed to directly changing existing values
    const day = { ...dayObj, spots };
    const newDays = state.days.map(d => d.name === state.day ? day : d);

    return newDays;
  };

  // Handles the booking of a new interview/saving changes
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // Handles the change of appointment booking with the new information and passes info
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => {
          const newStatesAppointments = {
            ...prev,
            appointments
          }

          const newStateFreshSpots = updateSpots(newStatesAppointments, appointments);

          return {
            ...newStatesAppointments,
            days: newStateFreshSpots
          }
        })
      })
  };

  // Function to cancel an interview
  function cancelInterview(id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
      .then((response) => {
        setState((prev) => {
          const newStatesAppointments = {
            ...prev,
            appointments
          }

          const newStateFreshSpots = updateSpots(newStatesAppointments, appointments);

          return {
            ...newStatesAppointments,
            days: newStateFreshSpots
          }
        })
      })
  }

  // Set Day function updates the day in state
  const setDay = day => setState({ ...state, day });

  // Runs a get request to /api/days and updates the days state with the response
  useEffect(() => {
    const daysURL = `/api/days`;
    const appointmentsURL = `/api/appointments`;
    const interviewersURL = `/api/interviewers`;

    Promise.all([
      axios.get(daysURL),
      axios.get(appointmentsURL),
      axios.get(interviewersURL)
    ]).then((all) => {
      console.log("All is = ", all);
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    })
  }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}