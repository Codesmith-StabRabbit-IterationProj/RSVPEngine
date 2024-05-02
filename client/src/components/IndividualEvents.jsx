import React from 'react';

export default function IndividualEvents(props) {
  return (
    <div>
      <div>event ID: {props.eventId}</div>
      <div>event Name: {props.eventName} </div>
      <div>event startTime: {props.startTime} </div>
      <div>event endTime: {props.eventName} </div>
      <div>event Location: {props.location} </div>
      <div>event Description: {props.description} </div>
      <div>event Attendees: {props.attendees} </div>
    </div>
  );
}

// attendees is an array of objects that has name and response
