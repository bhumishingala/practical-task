import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Characters from './Characters';
import CharactersDetail from './CharactersDetail';
import Task from "./Task";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Characters />
  },
  {
    path: "/characters/:id",
    element: <CharactersDetail />
  },
  {
    path: "/task2",
    element: <Task />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <App/>
      </RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
