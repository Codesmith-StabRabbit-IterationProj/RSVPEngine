import React from 'react';
import { useLoaderData } from 'react-router-dom';
import IndividualEvents from './IndividualEvents';
import { useOutletContext } from 'react-router-dom';

export async function loader({ params }) {
  const { user } = params;
  console.log('user in saved Events', user);
  return fetch(`http://localhost:3000/user/savedEvents/${user}`)
    .then((data) => data.json())
    .catch((err) => console.log(err));
}

export default function SavedEvents() {
  // savedEvents is an array of objects
  /*
  eventName: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  location: { type: String },
  description: { type: String },
  attendees: [attendeeSchema],
*/
  const [user, setUser] = useOutletContext();
  const savedEvents = useLoaderData();
  const event = savedEvents.map((savedEvent) => (
    <IndividualEvents
      key={savedEvent._id.toString()}
      eventId={savedEvent._id}
      eventName={savedEvent.eventName}
      startTime={savedEvent.startTime}
      endTime={savedEvent.endTime}
      location={savedEvent.location}
      description={savedEvent.description}
      attendees={savedEvent.attendees}
      user={user}
    />
  ));

  return <div>{event}</div>;
}
