import { Link, Outlet } from 'react-router-dom';
import { Tabs, Tab, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Login from './login';
const Login_Layout = () => {
	const location = useLocation();

	return (
		<Container>
			<Login></Login>
			<Outlet></Outlet>
		</Container>
	);
};

export default Login_Layout;
