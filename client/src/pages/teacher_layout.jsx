import ChecklistIcon from '@mui/icons-material/Checklist';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import {
	Box,
	Button,
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
const Layout = () => {
	const navigate = useNavigate();

	const [state, setState] = useState({
		left: false,
	});
	
	const user = useSelector((state) => state.user);

	if (!user) return null;

	if (!user.active) navigate('/');
	if (user.role === 'STUDENT') navigate('/student');
	if (user.role === 'ADMIN') navigate('/admin');

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
				<ListItem component={Link} to='/teacher/basis_enrolls' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ChecklistIcon></ChecklistIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Niên luận cơ sở'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/teacher/master_enrolls' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ChecklistIcon></ChecklistIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Niên luận ngành'}
						/>
					</ListItemButton>
				</ListItem>
				<ListItem component={Link} to='/teacher/uses' disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<ListAltIcon></ListAltIcon>
						</ListItemIcon>
						<ListItemText
							sx={{
								color: '#000000',
							}}
							primary={'Danh sách đề tài'}
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
		<>
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
		</>
	);
};

export default Layout;
