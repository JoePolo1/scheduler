import React from 'react';
import DayListItem from './DayListItem';

export default function DayList(props) {
  console.log(props);
  const daysParser = function() {

      return props.days.map((weekday) => {
        console.log(`Current weekday is `, weekday);
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