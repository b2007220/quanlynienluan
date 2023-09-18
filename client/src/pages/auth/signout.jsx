import { useNavigate } from 'react-router-dom';
import tokenService from '../../services/token.service';
import { useEffect } from 'react';

export default function SignOut() {
	const navigate = useNavigate();
	useEffect(() => {
		tokenService.deleteToken();
		navigate('/');
	}, [navigate]);
	return <></>;
}
