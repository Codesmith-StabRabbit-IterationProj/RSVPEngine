import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Attendee from './Attendee.jsx';
import { useOutletContext, useNavigate } from 'react-router-dom';

export async function loader({ params }) {
  console.log('params:', params);
  // make get request here
  const { eventId } = params;
  return fetch(`/api/event/${eventId}`)
    .then((data) => data.json())
    .then((response) => response)
    .catch((err) => console.log('error retrieving event info', err));
}

const EventApp = () => {
  const eventInfo = useLoaderData();
  const [eventId] = useState(eventInfo._id.toString());
  const [eventName, setEventName] = useState(eventInfo.eventName || '');
  const [startTime, setStartTime] = useState(new Date(eventInfo.startTime).toLocaleString() || '');
  const [endTime, setEndTime] = useState(new Date(eventInfo.endTime).toLocaleString() || '');
  const [location, setLocation] = useState(eventInfo.location || '');
  const [description, setDescription] = useState(eventInfo.description || '');
  const [attendeeName, setAttendeeName] = useState('');
  const [attendees, setAttendees] = useState(eventInfo.attendees || []);
  const [user, setUser] = useOutletContext();
  const navigate = useNavigate();

  // setEventName(eventInfo.eventName);

  const handleChange = (event) => {
    setAttendeeName(event.target.value);
  };

  const handleClick = (event) => {
    if (attendeeName.length > 0) {
      const data = {
        name: attendeeName,
        response: event.target.textContent,
      };
      console.log(attendeeName);
      console.log(event.target.textContent); // Yes, No, Maybe
      setAttendeeName(''); // reset attendee name
      // make post request here
      fetch(`/api/event/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((data) => data.json())
        .then((res) => setAttendees(res.attendees));
    }
  };

  const attendeesList = attendees.map((person) => (
    <Attendee key={person._id.toString()} name={person.name} response={person.response} />
  ));

  return (
    <div className='background main'>
      <div className='containerDiv'>
        <div className='h1W'>
          <h1>{eventName}</h1>
          <h1>
            {startTime} - {endTime}
          </h1>
          <h1>{location}</h1>
        </div>
        <input type='text' placeholder='name' value={attendeeName} onChange={handleChange} />
        <div className='chooses'>
          <button className='btn-hover color-1' onClick={handleClick}>
            Yes
          </button>
          <button className='btn-hover color-1' onClick={handleClick}>
            No
          </button>
          <button className='btn-hover color-1' onClick={handleClick}>
            Maybe
          </button>
        </div>
        <h1>{description}</h1>
        <h1 className='att'>Attendees</h1>
        <div className='attendees'>{attendeesList}</div>
      </div>
      <button onClick={() => navigate(`e/${user}`)}>Show saved events</button>
    </div>
  );
};

export default EventApp;
