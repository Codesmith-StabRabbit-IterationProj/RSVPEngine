import React from 'react';
import { useLoaderData } from 'react-router-dom';
import IndividualEvents from './IndividualEvents';

export async function loader({ params }) {
  const { user } = params;
  return fetch(`/api/savedEvents/${user}`)
    .then((data) => {
      data.json();
    })
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

  const savedEvents = useLoaderData();
  const event = savedEvents.map((savedEvent) => (
    <IndividualEvents
      key={savedEvents._id.toString()}
      eventId={savedEvents._id}
      eventName={savedEvent.eventName}
      startTime={savedEvent.startTime}
      endTime={savedEvent.endTime}
      location={savedEvent.location}
      description={savedEvent.description}
      attendees={savedEvent.attendees}
    />
  ));

  return <div>{event}</div>;
}
