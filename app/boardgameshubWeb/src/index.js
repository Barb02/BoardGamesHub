import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout, Homepage, Search, Product, Login, Wishlist, Publisher, Register, Admin } from './pages'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { useUserStore } from "./stores/useUserStore";


const AdminHandling = () => {
  const admin = useUserStore((state) => state.logged && state.admin);

  return admin ? <Admin /> : <Homepage />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      { path: "/", element:<Homepage/>},
      { path: "/search", element:<Search/>},
      { path: "/product/:id", element:<Product/>},
      { path: "/login", element:<Login/>},
      { path: "/register", element:<Register/>},
      { path: "/wishlist", element:<Wishlist/>},
      { path: "/publisher/:id", element:<Publisher/>},
      { path: '/admin', element: <AdminHandling /> },
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
