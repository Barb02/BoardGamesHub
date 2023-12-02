import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Layout from './pages/Layout';
import Homepage from './pages/Homepage';
import Search from './pages/Search';
import Product from './pages/Product';
import Login from './pages/Login';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "/", element:<Homepage/>},
      { path: "/search", element:<Search/>},
      { path: "/product/:id", element:<Product/>},
      { path: "/login", element:<Login/>}
    ]
  },
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
