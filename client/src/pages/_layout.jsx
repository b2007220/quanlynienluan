import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import '../index.css';
import authService from '../services/auth.service';
import { setUser } from '../store/user';

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
