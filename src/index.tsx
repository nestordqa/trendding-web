import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './ThemeContext';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLogin from './components/pages-components/AdminLogin';
import { ForgetPassword } from './components/pages-components/ForgetPassword';
import { AdminDashboard } from './components/pages-components/AdminDashboard';

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
    },
    {
        path: '/admin/dashboard/',
        element: <AdminDashboard />
    }
]);

root.render(
    <ThemeProvider>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </ThemeProvider>
);

reportWebVitals();
