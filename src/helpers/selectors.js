
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
    if (id === appointments[id].id) {
      result.push(appointments[id]);
    }
    
  });
  return result;
};