import React from 'react';
import PropTypes from 'prop-types';
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
        selected={person.id === props.value}
        setInterviewer={() => props.onChange(person.id)}
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

// proptypes testing to ensure interviewers is returned as an array type only and that it is required
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};