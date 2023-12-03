import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
// import SupportEngine from "./chat/SupportEngine";
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
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Layout = () => {
	const navigate = useNavigate();

	const [state, setState] = useState({
		left: false,
	});

	const user = useSelector((state) => state.user);

	if (!user) return null;
	if (!user.active) navigate('/');
	if (user.role === 'ADMIN') navigate('/admin');
	if (user.role === 'TEACHER') navigate('/teacher');

	const toggleDrawer = (anchor, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}

		setState({ ...state, [anchor]: open });
	};

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
				<ListItem component={Link} to='/student/info' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ContactEmergencyIcon></ContactEmergencyIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Thông tin cá nhân'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/student/enroll' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<AssignmentIcon></AssignmentIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Đăng kí đề tài'}
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
		<LocalizationProvider dateAdapter={AdapterDayjs}>
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
				{/* <SupportEngine/> */}
			</Container>
		</LocalizationProvider>
	);
};

export default Layout;
