import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from 'hooks/useVisualMode';

// Mode state constants to use for transitions
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRMING = "CONFIRMING";
const DELETING = "DELETING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";



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
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => {transition(ERROR_SAVE, true)});
  }

  function deletion(student, interviewer) {
    
    // Shows the confirm deletion page to prevent automatic destructive actions
    transition(CONFIRMING);
  }

  function confirmDeletion(student, interviewer) {

    // Shows the deleting indicator while the request is being handled to update the appointment
    transition(DELETING, true);

    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => {transition(ERROR_DELETE, true)});
  }

  // Handles editing of existing appointment
  const handleEdit = function() {
    transition(EDIT)
  }

  console.log("Mode is ", mode);


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === CONFIRMING && <Confirm 
                                message="Delete the appointment?"
                                onConfirm={confirmDeletion}
                                onCancel={() => transition(SHOW)}
                                />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === SHOW && (<Show
                            student={props.interview.student}
                            interviewer={props.interview.interviewer}
                            onDelete={deletion}
                            onEdit={handleEdit}
                            />
      )
      }
      {mode === CREATE && (<Form interviewers={props.interviewers} onSave={save} onCancel={back} />)}
      {mode === EDIT && (<Form student={props.interview.student} interviewers={props.interviewers} interviewer={props.interview.interviewer.id} onSave={save} onCancel={back} />)}
      {mode === ERROR_SAVE && <Error message="Could not save." onClose={back} />}
      {mode === ERROR_DELETE && <Error message="Could not delete." onClose={back} />}
    </article>
    
  );
};