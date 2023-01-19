import { useState } from "react";

// Function to use visual mode takes in an initial state
export default function useVisualMode(initial) {

  // it sets useState to the initial mode provided/passed down to it
  // const [modeState, setModeState] = useState(initialMode);
  const [history, setHistory] = useState([initial]);

  // Function which transitions the state if a new mode is provided
  function transition(mode, replace = false) {

    // Ternary conditional which, if replace is true, keeps the entire history stack minus the most recent and updates the mode.
    // Otherwise, updates the mode to the history stack
    setHistory((prev) => replace ? [...prev.slice(0, -1), mode] : [...prev, mode])
  }

  // Transitions to previous history stack mode, unless there is none (first page visited in a browser with nothing to go back to)
  function back() {
    setHistory((prev) => prev.length > 1 ? prev.slice(0, -1) : prev)
  }

  // Returns the new modes
  return {
    mode: history[history.length - 1],
    transition,
    back
  }

};


// [
//   show,
//   save,
//   create,
//   empty,
// ]