import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './ThemeContext';
import './styles/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './components/pages-components/AdminLogin';
import { ForgetPassword } from './components/pages-components/ForgetPassword';
import { AdminDashboard } from './components/pages-components/AdminDashboard';
import { CoursesManagement } from './components/pages-components/CoursesManagement';
import { LessonsManagement } from './components/pages-components/LessonsManagement';
import { TeachersManagement } from './components/pages-components/TeachersManagement';
import { MembershipsManagements } from './components/pages-components/MembershipsManagements';
import { TestManagement } from './components/pages-components/TestManagement';
import { UsersManagement } from './components/pages-components/UsersManagement';
import { AfiliatesManagement } from './components/pages-components/AfiliatesManagement';
import { PaymentManagement } from './components/pages-components/PaymentManagement';
import { CoursesCategories } from './components/pages-components/CoursesCategories';
import { Ads } from './components/pages-components/Ads';
import { Users } from './components/pages-components/Users';
import { Roles } from './components/pages-components/Roles';
import { Settings } from './components/pages-components/Settings';
import { Support } from './components/pages-components/Support';
import { Layout } from './components/common-components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CreateCourse } from './components/pages-components/CreateCourse';
import { CreateLesson } from './components/pages-components/CreateLesson';
import { CreateCategorie } from './components/pages-components/CreateCategorie';
import { CreateTeacher } from './components/pages-components/CreateTeacher';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider>
            <React.StrictMode>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/admin'
                            element={<AdminLogin />}
                        />
                        <Route
                            path='/forget/'
                            element={<ForgetPassword />}
                        />
                        <Route path='/admin/dashboard' element={<Layout />}>
                            <Route index element={<AdminDashboard />} />
                            <Route path='/admin/dashboard/courses' element={<CoursesManagement />} />
                            <Route path='/admin/dashboard/courses/create' element={<CreateCourse />} />
                            <Route path='/admin/dashboard/lessons' element={<LessonsManagement />} />
                            <Route path='/admin/dashboard/lessons/create' element={<CreateLesson />} />
                            <Route path='/admin/dashboard/teachers' element={<TeachersManagement />} />
                            <Route path='/admin/dashboard/teachers/create' element={<CreateTeacher />} />
                            <Route path='/admin/dashboard/memberships' element={<MembershipsManagements />} />
                            <Route path='/admin/dashboard/test' element={<TestManagement />} />
                            <Route path='/admin/dashboard/users' element={<UsersManagement />} />
                            <Route path='/admin/dashboard/afiliates' element={<AfiliatesManagement />} />
                            <Route path='/admin/dashboard/payments' element={<PaymentManagement />} />
                            <Route path='/admin/dashboard/courses-categories' element={<CoursesCategories />} />
                            <Route path='/admin/dashboard/courses-categories/create' element={<CreateCategorie />} />
                            <Route path='/admin/dashboard/ads' element={<Ads />} />
                            <Route path='/admin/dashboard/user' element={<Users />} />
                            <Route path='/admin/dashboard/roles' element={<Roles />} />
                            <Route path='/admin/dashboard/settings' element={<Settings />} />
                            <Route path='/admin/dashboard/support' element={<Support />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </React.StrictMode>
        </ThemeProvider>
    </QueryClientProvider>
);

reportWebVitals();
