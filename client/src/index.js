import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './stylesheets/styles.css';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  console.log('hello');
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}