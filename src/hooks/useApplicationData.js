import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";


// Helper hook for application data loading
export default function useApplicationData() {
  // Store all states in a single obj
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  // Handles updating of remaining spots
  const updateSpots = function(state, id) {
    let currentWeekdays = [];

    for (const day of state.days) {
      let newDayStateWithSpots = day;
      let currentSpots = 0;

      for (const ID of day.appointments)  {
        let instance = state.appointments[ID];
        // Increments a spot if interview does not exist (aka, got deleted)
        if (instance.interview === null)  {
          currentSpots++;
        }
      }
      // Sets the current remaining spots to current spots
      newDayStateWithSpots.spots = currentSpots;
      
      // adds the updated amount to the updated days array
      currentWeekdays.push(newDayStateWithSpots)
    }

    const newStateFreshSpots = {
      ...state,
      days: currentWeekdays
    };

    return newStateFreshSpots;
  }


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

        const newStateFreshSpots = updateSpots(newStatesAppointments, id);

        return newStateFreshSpots;
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
      .then(() => setState((prev) => {
        const newStatesAppointments = {
          ...prev,
          appointments
        }
        // updates state with new appointment and spots remaining
        const newStateFreshSpots = updateSpots(newStatesAppointments, id);
        return newStateFreshSpots;
      }))
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
        console.log(`State dot days is ${state.days}`);
        console.log(`State dot appointments is ${state.appointments}`);
        console.log(`State dot interviewers is ${state.interviewers}`);
      })
    }, [])

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}