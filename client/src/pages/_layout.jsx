import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import authService from '../services/auth.service';
import { setUser } from '../store/user';
import '../index.css';

const PageLayout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		authService.getUserProfile().then((res) => {
			dispatch(setUser(res));
		});
	}, [dispatch]);

	return (
		<>
			<Outlet />
		</>
	);
};

export default PageLayout;
