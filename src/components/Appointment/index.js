import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

// Mode state constants to use for transitions
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";



// Appointment component declaration
export default function Appointment(props) {

  // Custom hook imported which passes in the the SHOW mode if props.interview has a value, if it is empty it passes EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )
      }
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave={props.onSave} onCancel={props.onCancel} />)}
    </article>
  );
};