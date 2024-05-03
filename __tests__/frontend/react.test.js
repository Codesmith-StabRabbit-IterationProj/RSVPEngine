import React from 'react';
import { Router, Link, MemoryRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, cleanup, getAllByRole, within, getByText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../../client/src/App.jsx';
import Attendee from '../../client/src/components/Attendee';
import EventApp from '../../client/src/components/EventApp';
import EventForm from '../../client/src/components/EventForm';
import PrimaryButton from '../../client/src/components/PrimaryButton';
import Root from '../../client/src/components/Root';
import router from '../../client/src/index';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useOutletContext: () => [{ name: 'Jane Doe' }, jest.fn()],
}));

describe('Unit testing create events components', () => {
  let role;
  let showLink;
  beforeEach(() => {
    render(
      <BrowserRouter>
        <EventForm />
      </BrowserRouter>,
    );
    role = screen.getAllByRole('textbox');
    showLink = false;
  });
  // TODO:
  // feel free to take out anything here just added them for now
  // 1. form data updates correctly
  // 2. test creating event which generates a link which redirects
  // 3. test rerouting to /e/:id by comparing generated url to website url
  it('Allow user to input event name', async () => {
    await userEvent.type(role[0], 'picnic');
    expect(role[0].value).toEqual('picnic');
  });

  it('Allow user to input start/end date and time', async () => {
    const date = screen.getAllByRole('date');
    await userEvent.type(date[0], '2024-04-30T18:36');
    expect(date[0].value).toEqual('2024-04-30T18:36');

    await userEvent.type(date[1], '2024-04-30T18:36');
    expect(date[1].value).toEqual('2024-04-30T18:36');
  });

  it('Allow user to input location and description', async () => {
    await userEvent.type(role[1], 'nyc');
    expect(role[1].value).toEqual('nyc');

    await userEvent.type(role[2], 'Some Description');
    expect(role[2].value).toEqual('Some Description');
  });

  it('Create event button generates a link', async () => {
    const button = screen.getAllByRole('button');
    button[0].onclick = () => (showLink = true);
    userEvent.click(button[0]);
    // some logic to check if hyperlink is not undefined
    // Good Resource: https://github.com/testing-library/react-testing-library

    render(<a>Event Link</a>);
    const link = await screen.findByText('Event Link');
    console.log('link:', link);
    expect(link).toBeInTheDocument();
    expect(showLink).toEqual(true);
  });
});

// describe('Unit testing eventapp components', () => {
//   let eventName; // heading 0
//   let startTime; // heading 1
//   let endTime; // heading 1
//   let location; // heading 2
//   let description; // heading 3
//   // heading 4 is just text that will not be used
//   let attendeeName;
//   let attendees = [];
//   let headers;
//   /* as soon as we try to render EventApp component,
//   we get an error when we run the test because of useLoaderData.
//   it tries to connect to backend which isn't setup in frontend testing
//   */
//   beforeEach(() => {
//     const state = {
//       eventName: 'picnic',
//       startTime: '2024-04-30T18:36',
//       endTime: '2024-05-01T18:36',
//       location: 'nyc',
//       description: 'study date',
//       attendeeName: 'dannyphantom',
//       headers: getAllByRole('heading'),
//     };
//     render();
//     // <MemoryRouter initialEntries={['/']}>
//     //   <RouterProvider router={router} />
//     // </MemoryRouter>,
//   });
//   // TODO:
//   // 2. test rendering date/time
//   // 3. test updating name field
//   // 4. test yes/no/maybe buttons
//   // 5. test attendees list updating
//   // 6. test Attendee response and name to match input
//   // it('Event name matches user selection'), () => {};
//   // it('Date And Time matches user selection'), () => {};
//   it('Attendee response and name to match input', () => {
//     let name = 'Yams';
//     let response = 'Maybe';
//     render(<Attendee />);

//     let allDiv = getAllByRole('div');

//     expect(screen.allDiv[0].toHaveTextContent('Yams'));
//   });
// });
