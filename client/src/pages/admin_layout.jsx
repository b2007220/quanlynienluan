import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BadgeIcon from '@mui/icons-material/Badge';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const Layout = () => {
	const navigate = useNavigate();

	const user = useSelector((state) => state.user);
	if (!user) return null;
	if (!user.active) navigate('/');
	if (user.role === 'STUDENT') navigate('/student');
	if (user.role === 'TEACHER') navigate('/teacher');

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
				<ListItem component={Link} to='/admin' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<AccountCircleIcon></AccountCircleIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Tài khoản'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/admin/major' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<BadgeIcon></BadgeIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Chuyên ngành'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/admin/year' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<EventIcon></EventIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Năm học'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/admin/semester' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<CalendarMonthIcon></CalendarMonthIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Học kì'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/admin/password' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<PasswordIcon></PasswordIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Đổi mật khẩu'}
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
			</Container>
		</LocalizationProvider>
	);
};

export default Layout;
