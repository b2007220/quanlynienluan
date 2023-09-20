import { createBrowserRouter } from 'react-router-dom';
import StudentHomePage from '../pages/student/';
import Student_Layout from '../pages/student_layout';
import Login_Layout from '../pages/login';
import Teacher_Layout from '../pages/teacher_layout';
import Admin_Layout from '../pages/admin_layout';
import AdminHomePage from '../pages/admin';
import AdminMajorPage from '../pages/admin/major';
import StudentInfoPage from '../pages/student/info';
import TeacherHomePage from '../pages/teacher';
import TeacherInfoPage from '../pages/teacher/info';
import SignOut from '../pages/auth/signout';
import AdminYearPage from '../pages/admin/year';
import AdminSemesterPage from '../pages/admin/semester';
import AdminPasswordPage from '../pages/admin/password';
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
				path: '/student',
				Component: StudentHomePage,
			},
			{
				path: '/student/info',
				Component: StudentInfoPage,
			},
		],
	},
	{
		path: '/teacher',
		Component: Teacher_Layout,
		children: [
			{
				path: '/teacher',
				Component: TeacherHomePage,
			},
			{
				path: '/teacher/info',
				Component: TeacherInfoPage,
			},
		],
	},
	{
		path: '/admin',
		Component: Admin_Layout,
		children: [
			{
				path: '/admin',
				Component: AdminHomePage,
			},
			{
				path: '/admin/major',
				Component: AdminMajorPage,
			},
			{
				path: '/admin/password',
				Component: AdminPasswordPage,
			},
			{
				path: '/admin/year',
				Component: AdminYearPage,
			},
			{
				path: '/admin/semester',
				Component: AdminSemesterPage,
			},
		],
	},
	{
		path: '/signout',
		Component: SignOut,
	},
]);

export default router;
