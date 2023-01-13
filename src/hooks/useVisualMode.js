import { useState } from "react";

// Function to use visual mode takes in an initial state
export default function useVisualMode(initialMode)  {

  // it sets useState to the initial mode provided/passed down to it
  const [modeState, setModeState] = useState(initialMode);

  // It returns an object with the mode property
  return { 
    mode: modeState }
};