import { createBrowserRouter } from 'react-router-dom';
import AdminHomePage from '../pages/admin';
import AdminMajorPage from '../pages/admin/major';
import AdminPasswordPage from '../pages/admin/password';
import AdminSemesterPage from '../pages/admin/semester';
import AdminYearPage from '../pages/admin/year';
import Admin_Layout from '../pages/admin_layout';
import SignOut from '../pages/auth/signout';
import Login_Layout from '../pages/login';
import StudentHomePage from '../pages/student/';
import StudentEnrollPage from '../pages/student/enroll';
import StudentInfoPage from '../pages/student/info';
import Student_Layout from '../pages/student_layout';
import TeacherHomePage from '../pages/teacher';
import TeacherInfoPage from '../pages/teacher/info';
import Teacher_Layout from '../pages/teacher_layout';
import TeacherEnrollsPage from '../pages/teacher/enroll';
import TeacherUsesPage from '../pages/teacher/use';
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
			{
				path: '/student/enroll',
				Component: StudentEnrollPage,
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
			{
				path: '/teacher/uses',
				Component: TeacherUsesPage,
			},
			{
				path: '/teacher/enrolls',
				Component: TeacherEnrollsPage,
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
