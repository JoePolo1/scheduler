import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  // Function for handling parsing the days
  const daysParser = function() {
      return props.days.map((weekday) => {

        // must return either HTML or a COMPONENT. In this case, returns a Component.
        return(
        <DayListItem 
        key={weekday.id}
        name={weekday.name}
        spots={weekday.spots}
        selected={weekday.name === props.day}
        setDay={props.setDay}
        />)
      })
  }

  return (
    <ul>
      {daysParser()}
    </ul>
  )
}