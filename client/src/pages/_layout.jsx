import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Tabs, Tab, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import authService from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user';

const Layout = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				dispatch(setUser(user));
			})
			.catch((error) => {
				console.log(error);
				navigate('/login');
			});
	}, []);

	return (
		<Container>
			<Tabs value={location.pathname}>
				<Tab label='Home' to='/' component={Link} value='/' />
				<Tab label='Users' to='/users' component={Link} value='/users' />
			</Tabs>

			<Outlet />
		</Container>
	);
};

export default Layout;
