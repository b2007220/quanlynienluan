import { Link, Outlet } from 'react-router-dom';
import { Tabs, Tab, Container } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LinearGradient from 'react-native-linear-gradient';

const Login_Layout = () => {
	const location = useLocation();

	return (
		<Container style={{ flex: 1 }}>
			<LinearGradient color={['#141e30', '#243b55']} style={{ flex: 1 }}>
				<Tabs value={location.pathname}>
					<Tab label='Login' to='/' component={Link} value='/' />
				</Tabs>
			</LinearGradient>
		</Container>
	);
};

export default Login_Layout;
