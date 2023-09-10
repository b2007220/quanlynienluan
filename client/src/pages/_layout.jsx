import { Link, Outlet } from 'react-router-dom';
import { Tabs, Tab, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Layout = () => {
	const location = useLocation();

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
