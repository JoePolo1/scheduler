import React from 'react';
import classNames from 'classnames';
import "components/InterviewerListItem.scss"

export default function InterviewerListItem(props) {

  // Changes interviewer class conditionally based on selection status/state
  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  }
  )

  // Helper function that hides or shows the name of the interviewee based on selection state
  const conditionalName = function () {
    if (props.selected) {
      return props.name;
    } else return "";
  };

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
    <img
      key={props.id}
      className="interviewers__item-image"
      src={props.avatar}
      alt={props.name}
    />
    {conditionalName()}
  </li>
  );
};