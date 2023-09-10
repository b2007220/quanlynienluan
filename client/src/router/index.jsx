import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/home';
import Layout from '../pages/_layout';
import UsersPage from '../pages/users';
import Login_Layout from '../pages/login';

const router = createBrowserRouter([
	{
		path: '/login',
		Component: Login_Layout,
	},
	{
		path: '/',
		Component: Layout,
		children: [
			{
				path: '',
				Component: HomePage,
			},
			{
				path: 'users',
				Component: UsersPage,
			},
		],
	},
]);

export default router;
