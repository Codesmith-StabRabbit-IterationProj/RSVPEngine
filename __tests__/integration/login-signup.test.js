import request from 'supertest';
import app from '../../server/src/server';
import React from 'react';
import { Router, Link, MemoryRouter, RouterProvider } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../client/src/App.jsx';
import Attendee from '../../client/src/components/Attendee';
import EventApp from '../../client/src/components/EventApp';
import EventForm from '../../client/src/components/EventForm';
import PrimaryButton from '../../client/src/components/PrimaryButton';
import Root from '../../client/src/components/Root';
import router from '../../client/src/index';

describe('Unit testing eventapp components', () => {
  let eventName; // heading 0
  let startTime; // heading 1
  let endTime; // heading 1
  let location; // heading 2
  let description; // heading 3
  // heading 4 is just text that will not be used
  let attendeeName;
  let attendees = [];
  let headers;
  /* as soon as we try to render EventApp component,
    we get an error when we run the test because of useLoaderData.
    it tries to connect to backend which isn't setup in frontend testing
    */
  beforeEach(() => {
    const state = {
      eventName: 'picnic',
      startTime: '2024-04-30T18:36',
      endTime: '2024-05-01T18:36',
      location: 'nyc',
      description: 'study date',
      attendeeName: 'dannyphantom',
      headers: getAllByRole('heading'),
    };
    render(
      <MemoryRouter initialEntries={['/']}>
        <RouterProvider router={router} />
      </MemoryRouter>,
    );
  });
  // TODO:
  // 2. test rendering date/time
  // 3. test updating name field
  // 4. test yes/no/maybe buttons
  // 5. test attendees list updating
  // 6. test Attendee response and name to match input
  // it('Event name matches user selection'), () => {};
  // it('Date And Time matches user selection'), () => {};
});
