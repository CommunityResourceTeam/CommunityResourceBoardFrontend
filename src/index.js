import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Setting from './pages/Setting';
import reportWebVitals from './reportWebVitals';
import ExplorePage from './pages/ExplorePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/posts",
    element: <Setting />
  },
  {
    path: "/setting",
    element: <Setting />
  },
  {
    path: "/posts",
    element: <Setting />
  },
  {
    path: "/setting",
    element: <Setting />
  },
  {
    path: "/explorePage",
    element: <ExplorePage />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
