
// Helper function to update spots remaining on a single day

const updateSpots = function(state, appointments) {
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
  const day = {...dayObj, spots};
  const newDays =  state.days.map(d => d.name === state.day ? day : d);

  return newDays;
};

module.export = updateSpots;