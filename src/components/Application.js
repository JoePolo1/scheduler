import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";




export default function Application(props) {

  // Sets the state to initial object with days, appointments and interviewers
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

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


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {dailyAppointments.map((appointment) => {
          const interview = getInterview(state, appointment.interview)
          return (
            <Appointment
              key={appointment.id}
              {...appointment}
              interview={interview}
              interviewers={dailyInterviewers}/>
          )
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}