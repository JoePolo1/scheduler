import React from 'react';
import "components/Appointment/styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props)  {

  // Helper shows the show container or empty container depending on if an interview object exists
  const handleInterviews = function() {
    if (props.interview)  {
      return <Show student={props.interview.student} interviewer={props.interview.interviewer} />
    } else { 
      return <Empty />;
    };
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {handleInterviews()}
    </article>
  );
};