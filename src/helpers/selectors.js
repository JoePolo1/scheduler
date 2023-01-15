
// Helper function to get appointments by day
export function getAppointmentsForDay(state, day) {

  // Returns an array of appointments for specific day
  const result = [];

  // Returns an empty array when the days data is empty
  if (!state.days.length) {
    return result;
  };

    // Loop through state.days to find the day matching the parameter argument
  const findDay = state.days.filter(x => x.name === day);

  // Returns an empty array when the day is not found
  if (!findDay[0]) {
    return result;
  }


  // Get ID's for a specific day
  const appointmentIdDay = findDay[0].appointments;

  // All appointments here
  const appointments = state.appointments;

  // Loop through appointments to match with ID, push the data into it, then return the array result
  appointmentIdDay.forEach(id => {
    // if (id === appointments[id]) {
      result.push(appointments[id]);
    // }
    
  });
  return result;
};

// Interview getting helper function
export function getInterview(state, interview) {

  // Set up return variable to type Object
  let result = {};

  // Returns null when an interview does not exist
  if (!interview) {
    return null;
  };

  // We need a way to identify which interviewers match on id
  for (const id in state.interviewers)  {
    // Loops through id of interviewers to determine the match and then returns object with the interview data
    if (interview.interviewer === state.interviewers[id].id)  {
      result = {
        student: interview.student,
        interviewer: state.interviewers[id]
      };
      return result;
    }
  }
}

/** ******* */

// Helper function to get appointments by day
export function getInterviewersForDay(state, day) {

  // Returns an array of appointments for specific day
  const result = [];

  // Returns an empty array when the days data is empty
  if (!state.days.length) {
    return result;
  };

    // Loop through state.days to find the day matching the parameter argument
  const findDay = state.days.filter(x => x.name === day);

  // Returns an empty array when the day is not found
  if (!findDay[0]) {
    return result;
  }

  // Get ID's for a specific day
  const interviewerIdDay = findDay[0].interviewers;

  // All interviewers here
  const interviewers = state.interviewers;

  // Loop through interviewers to match with ID, push the data into it, then return the array result
  interviewerIdDay.forEach(id => {
    if (interviewers[id]) {
      result.push(interviewers[id]);
    }
    
  });
  return result;
};