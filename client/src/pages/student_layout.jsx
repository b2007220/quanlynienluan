import { Link, Outlet, useNavigate } from 'react-router-dom';
import {
	Container,
	SwipeableDrawer,
	Button,
	ListItem,
	ListItemButton,
	ListItemIcon,
	Box,
	List,
	ListItemText,
	createTheme,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import authService from '../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../store/user';
import { Fragment } from 'react';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

const Layout = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				dispatch(setUser(user));
				if (user.role === 'TEACHER') {
					navigate('/teacher');
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
				<ListItem component={Link} to='/student' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary='Banana'
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/user' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Apple'}
						/>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
	return (
		<Container maxWidth='100%'>
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
