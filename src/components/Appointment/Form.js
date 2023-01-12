import React, { useState } from 'react';
import Button from 'components/Button';
import InterviewerList from 'components/InterviewerList';


// Form component function for appointment
export default function Form(props) {

  // sets the state of the student and interviewer through the provided props if they exist
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

    // Helper function to load interviewer
    const handleInterviewer = function (person) {
      console.log(`HandleInterviewer person is`, person);
      setInterviewer(person)
    }

    // Cancel  button reset logic
    const reset = function() {
      setStudent("");
      setInterviewer(null);
    }

    // Cancel button onCancel logic
    const cancel = function() {
      reset();
      props.onCancel();
    }


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          selectedInterviewer={interviewer}
          onChange={handleInterviewer}
          onClick={(event) => setInterviewer(event.target.value)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
        <Button danger onClick={cancel} >Cancel</Button>
        <Button confirm onClick={props.onSave} >Save</Button>
        </section>
      </section>
    </main>
  );
};