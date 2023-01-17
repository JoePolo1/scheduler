import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import useVisualMode from 'hooks/useVisualMode';

// Mode state constants to use for transitions
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRMING = "CONFIRMING";
const DELETING = "DELETING";



// Appointment component declaration
export default function Appointment(props) {

  // Custom hook imported which passes in the the SHOW mode if props.interview has a value, if it is empty it passes EMPTY
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    // Shows the saving indicator while the request is being handled to update the appointment
    transition(SAVING);

    // debugger;

    // props.bookInterview(props.id, interview);
    props.bookInterview(props.id, interview).then(() => transition(SHOW)).catch((error) => {console.log(error)});
    // console.log("props.id is", props.id, "interview is ", interview, "student is ", interview.student);
    // transitions mode to Show the new booked appointment
    // transition(SHOW);
  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CONFIRMING && <Confirm message="Delete the appointment?"/>}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )
      }
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave={save} onCancel={() => transition(EMPTY)} />)}
    </article>
  );
};