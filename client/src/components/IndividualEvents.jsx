import React from 'react';
import { Link } from 'react-router-dom';

export default function IndividualEvents(props) {
  const addToGoogleCalendar = () => {
    fetch('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify({
        // something
        // something
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => data.json())
      .catch((err) => console.log(err));
  };

  // only showing attendees that responded yes
  const yesAttendees = props.attendees
    .filter((attendee) => attendee.response === 'Yes')
    .map((attendee) => attendee.name);

  const noAttendees = props.attendees
    .filter((attendee) => attendee.response === 'No')
    .map((attendee) => attendee.name);

  const maybeAttendees = props.attendees
    .filter((attendee) => attendee.response === 'Maybe')
    .map((attendee) => attendee.name);

  const startTime = () => {
    const time = new Date(props.startTime);
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return time.toLocaleString('en-US', options);
  };

  const endTime = () => {
    const time = new Date(props.endTime);
    const options = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return time.toLocaleString('en-US', options);
  };

  const startTimereturn = startTime();
  const endTimereturn = endTime();

  return (
    <div>
      <h1>
        <Link to={`/e/${props.eventId}`}>Event Link</Link>
      </h1>
      <div>
        <h2 className='bold'>Event Name:</h2>
        <p>{props.eventName}</p>
      </div>
      <div>
        <h2 className='bold'>Event Location:</h2>
        <p>{props.location}</p>
      </div>
      <div>
        <h2 className='bold'>Event Description:</h2>
        <p>{props.description}</p>
      </div>
      <div>
        <h2 className='bold'>Event Attendees:</h2>
        <div>
          <h3>Going</h3>
          <p>{yesAttendees.join(', ')}</p>
        </div>
        <div>
          <h3>Not Going</h3>
          <p>{noAttendees.join(', ')}</p>
        </div>
        <div>
          <h3>Maybe</h3>
          <p>{maybeAttendees.join(', ')}</p>
        </div>
        <button onClick={addToGoogleCalendar}>Add to Google Calendar</button>
      </div>
    </div>
  );
}
