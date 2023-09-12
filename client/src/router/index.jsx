import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import Student_Layout from '../pages/student_layout';
import UsersPage from '../pages/users';
import Login_Layout from '../pages/login';
import Teacher_Layout from '../pages/teacher_layout';
import Admin_Layout from '../pages/admin_layout';

const router = createBrowserRouter([
	{
		path: '/login',
		Component: Login_Layout,
	},
	{
		path: '/student',
		Component: Student_Layout,
		children: [
			{
				path: '',
				Component: HomePage,
			},
			{
				path: 'user',
				Component: UsersPage,
			},
		],
	},
	{
		path: '/teacher',
		Component: Teacher_Layout,
		children: [
			{
				path: '',
				Component: HomePage,
			},
			{
				path: 'user',
				Component: UsersPage,
			},
		],
	},
	{
		path: '/admin',
		Component: Admin_Layout,
		children: [
			{
				path: '',
				Component: HomePage,
			},
			{
				path: 'user',
				Component: UsersPage,
			},
		],
	},
]);

export default router;
