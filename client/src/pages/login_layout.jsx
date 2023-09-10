import { Link, Outlet } from 'react-router-dom';
import { Tabs, Tab, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Login_Layout = () => {
	const location = useLocation();

	return (
		<Container>
			<Tabs value={location.pathname}>
				<Tab label='Login' to='/' component={Link} value='/' />
			</Tabs>
			<Outlet />
		</Container>
	);
};

export default Login_Layout;
