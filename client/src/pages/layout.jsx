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
import { useDispatch } from 'react-redux';
import { setUser } from '../store/user';
import { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>

							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
				<ListItem component={Link} to='/user' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary={'Banana'} />
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	);
	const useStyles = makeStyles((theme) => ({
		customContainer: {
			marginLeft: 0, // Đặt giá trị margin-left thành 0
		},
	}));
	const classes = useStyles();
	return (
		<Container className={classes.customContainer}>
			<div>
				{['left'].map((anchor) => (
					<Fragment key={anchor}>
						<Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
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
