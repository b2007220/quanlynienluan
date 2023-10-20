import { useNavigate } from 'react-router-dom';
import tokenService from '../../services/token.service';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';

export default function SignOut() {
	const navigate = useNavigate();
	const dispatch = useDispatch()

	useEffect(() => {
		tokenService.deleteToken();
		dispatch(setUser(null))
		navigate('/');
	}, [dispatch, navigate]);
	return <></>;
}
