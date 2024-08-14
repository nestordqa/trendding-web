import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLogin from './components/pages-components/AdminLogin';
import { ForgetPassword } from './components/pages-components/ForgetPassword';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: '/admin/',
        element: <AdminLogin />
    },
    {
        path: '/forget/',
        element: <ForgetPassword />
    }
]);

root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);

reportWebVitals();
