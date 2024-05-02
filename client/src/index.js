import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import EventApp from './components/EventApp.jsx';
import Root from './components/Root.jsx';
import './stylesheets/styles.css';
import { loader as eventLoader } from './components/EventApp.jsx';
import { loader as userLoader } from './components/SavedEvents.jsx';
import EventForm from './components/EventForm.jsx';
import Signup from './components/Signup.jsx';
import SavedEvents from './components/SavedEvents.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/form',
        element: <EventForm />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: 'e/:eventId',
        loader: eventLoader,
        element: <EventApp />,
      },
      {
        path: 'user/:user',
        loader: userLoader,
        element: <SavedEvents />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}

export default router;
