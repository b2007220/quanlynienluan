import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeIcon from '@mui/icons-material/Home';
import {
	Box,
	Button,
	Container,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import { setUser } from '../store/user';
import LogoutIcon from '@mui/icons-material/Logout';
const Layout = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				dispatch(setUser(user));
				if (user.role === 'STUDENT') {
					navigate('/student');
				}
				if (user.role === 'ADMIN') {
					navigate('/admin');
				}
			})
			.catch((error) => {
				console.log(error);
				navigate('/');
			});
	}, []);
	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

	const [state, setState] = useState({
		left: false,
	});
	const list = (anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem component={Link} to='/teacher' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<HomeIcon></HomeIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Trang chủ'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/teacher/info' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ContactEmergencyIcon></ContactEmergencyIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Thông tin'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/signout' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon></LogoutIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Đăng xuất'}
						/>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
	return (
		<Container>
			<div>
				{['left'].map((anchor) => (
					<Fragment key={anchor}>
						<Button onClick={toggleDrawer(anchor, true)}>
							<DensityMediumIcon></DensityMediumIcon>
						</Button>
						<SwipeableDrawer
							anchor={anchor}
							open={state[anchor]}
							onClose={toggleDrawer(anchor, false)}
							onOpen={toggleDrawer(anchor, true)}
						>
							{list(anchor)}
						</SwipeableDrawer>
					</Fragment>
				))}
			</div>
			<Outlet />
		</Container>
	);
};

export default Layout;
