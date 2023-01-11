import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import "components/InterviewerList.scss"

// Interviewer List component function
export default function InterviewerList(props) {

  // Function for handling and parsing the interviewers
  const interviewerParser = function()  {
    return props.interviewers.map((person) => {
      return (
        <InterviewerListItem 
        key={person.id}
        name={person.name}
        avatar={person.avatar}
        selected={person.id === props.interviewer}
        id={person.id}
        setInterviewer={props.setInterviewer}
        />
      )
    });
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewerParser()}</ul>
    </section>
  );
};