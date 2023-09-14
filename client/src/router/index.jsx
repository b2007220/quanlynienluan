import { createBrowserRouter } from 'react-router-dom';
import StudentHomePage from '../pages/student/';
import Student_Layout from '../pages/student_layout';
import UsersPage from '../pages/users';
import Login_Layout from '../pages/login';
import Teacher_Layout from '../pages/teacher_layout';
import Admin_Layout from '../pages/admin_layout';
import AdminHomePage from '../pages/admin';

const router = createBrowserRouter([
	{
		path: '/',
		Component: Login_Layout,
	},
	{
		path: '/student',
		Component: Student_Layout,
		children: [
			{
				path: '/student/',
				Component: StudentHomePage,
			},
			// {
			// 	path: '/student/user',
			// 	Component: UsersPage,
			// },
		],
	},
	// {
	// 	path: '/teacher',
	// 	Component: Teacher_Layout,
	// 	children: [
	// 		{
	// 			path: '/teacher/',
	// 			Component: HomePage,
	// 		},
	// 		{
	// 			path: '/teacher/user',
	// 			Component: UsersPage,
	// 		},
	// 	],
	// },
	{
		path: '/admin',
		Component: Admin_Layout,
		children: [
			{
				path: '/admin/',
				Component: AdminHomePage,
			},
			{
				path: '/admin/user',
				Component: UsersPage,
			},
		],
	},
]);

export default router;
