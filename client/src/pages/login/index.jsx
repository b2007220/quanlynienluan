import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { auth } from '../../firebase';
import authService from '../../services/auth.service';
import tokenService from '../../services/token.service';
import { setUser } from '../../store/user';
import style from './login.module.css';
import { useSelector } from 'react-redux';

const validationSchema = Yup.object().shape({
	email: Yup.string().required('Email is required'),
	password: Yup.string().required('Password is required'),
});

export default function Login() {
	const MySwal = withReactContent(Swal);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);

	switch (user?.role) {
		case 'STUDENT':
			navigate('/student');
			break;

		case 'TEACHER':
			navigate('/teacher');
			break;
		case 'ADMIN':
			navigate('/admin');
			break;
	}

	const handleSignIn = async () => {
		try {
			const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

			const idToken = await user.getIdToken();

			const res = await authService.signInWithIdToken(idToken);

			tokenService.setToken(res.token);

			const profile = await authService.getUserProfile();

			if (!profile.active) {
				MySwal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Tài khoản của bạn đã bị khóa!',
				});
				return;
			}

			dispatch(setUser(profile));
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Đăng nhập thất bại!',
			});
		}
	};
	const handleLogin = async (values) => {
		try {
			const { email, password } = values;
			const res = await authService.login({ email, password });
			tokenService.setToken(res.token);
			const profile = await authService.getUserProfile();

			if (!profile.active) {
				MySwal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Tài khoản của bạn đã bị khóa!',
				});
				return;
			}

			dispatch(setUser(profile));
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Đăng nhập thất bại!',
			});
		}
	};
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			onSubmit={handleLogin}
			validationSchema={validationSchema}
		>
			{({ values, handleSubmit, handleChange }) => {
				return (
					<>
						<div className={style.container}>
							<div className={style.login__box}>
								<h2>Trang đăng nhập</h2>
								<div className={style.form__container}>
									<form onSubmit={handleSubmit}>
										<div className={style.user__box}>
											<input
												type='text'
												name='email'
												autoComplete='off'
												required
												onChange={handleChange}
												value={values.email}
											/>
											<label htmlFor='email'>
												<span>Tài khoản</span>
											</label>
										</div>
										<div className={style.user__box}>
											<input
												type='password'
												name='password'
												autoComplete='off'
												required
												onChange={handleChange}
												value={values.password}
											/>
											<label htmlFor='password'>
												<span>Mật khẩu</span>
											</label>
										</div>
										<button type='submit' onClick={handleSubmit}>
											<span></span>
											<span></span>
											<span></span>
											<span></span>
											Đăng nhập
										</button>
									</form>
								</div>
								<div className={style.middle__test}>
									<hr />
								</div>
								<div className={style.social__signin}>
									<button className={style.input__google} onClick={handleSignIn}>
										<div className={style.icon}>
											<GoogleIcon></GoogleIcon>
										</div>
										<div className={style.text}>
											Sign In with Google
										</div>
									</button>
								</div>
							</div>
						</div>
					</>
				);
			}}
		</Formik>
	);
}
