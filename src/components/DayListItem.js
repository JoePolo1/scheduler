import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props)  {

  // Responsible for formatting specific output if 1 or 0 spots remain
  const formatSpots = function()  {
    if (props.spots === 1)  {
      return `1 spot remaining`;
    } else if (props.spots === 0)  {
      return `no spots remaining`;
    } else {
      return `${props.spots} spots remaining`;
    };
  };

  // changes class conditionally for the list items
  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
    <h2 className="text--regular" >{props.name}</h2>
    <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}