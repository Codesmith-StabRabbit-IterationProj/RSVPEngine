import { readNextDescriptor } from '@testing-library/user-event/dist/cjs/utils/index.js';
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
  const yesAttendees = props.attendees.map((attendee) => {
    if (attendee.response === 'Yes') {
      return attendee.name;
    }
  });

  const noAttendees = props.attendees.map((attendee) => {
    if (attendee.response === 'No') {
      return attendee.name;
    }
  });

  const maybeAttendees = props.attendees.map((attendee) => {
    if (attendee.response === 'Maybe') {
      return attendee.name;
    }
  });

  // 2024-04-30T18:36

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
      <h1>{<Link to={`/e/${props.eventId}`}>Event Link</Link>}</h1>
      <h1>Event Name: {props.eventName}</h1>
      {/* probably need to convert time to a different format to display */}
      {/* <h1>Event Duration: {`${startTime()}` - `${endTime()}`}</h1> */}
      <h1>Event Location: {props.location}</h1>
      <h1>Event Description: {props.description}</h1>
      <h1>
        Event Attendees:
        <p>
          Going
          <br />
          {yesAttendees.join(', ')}
        </p>
        <p>
          Not Going
          <br />
          {noAttendees.join(', ')}
        </p>
        <p>
          Maybe
          <br />
          {maybeAttendees.join(', ')}
        </p>
        <button onClick={addToGoogleCalendar}>Add to Google Calendar</button>
      </h1>
    </div>
  );
}

// attendees is an array of objects that has name and response
