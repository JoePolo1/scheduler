import React from 'react';
import DayListItem from './DayListItem';


// Day list component function
export default function DayList(props) {

  // Function for handling parsing the days
  const daysParser = function () {
    console.log("props.days is ", props.days);
    return props.days.map((weekday) => {

      // must return either HTML or a COMPONENT. In this case, returns a Component for day list items.
      return (
        <DayListItem
          key={weekday.id}
          name={weekday.name}
          spots={weekday.spots}
          selected={weekday.name === props.value}
          setDay={props.onChange}
        />)
    })
  }

  return (
    <ul>
      {daysParser()}
    </ul>
  )
}