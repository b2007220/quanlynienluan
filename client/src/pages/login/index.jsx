import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import style from './login.module.css';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import authService from '../../services/auth.service';
import tokenService from '../../services/token.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import GoogleIcon from '@mui/icons-material/Google';

export default function Login() {
	const MySwal = withReactContent(Swal);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleSignIn = async () => {
		try {
			const { user } = await signInWithPopup(auth, new GoogleAuthProvider());

			const idToken = await user.getIdToken();

			const res = await authService.signInWithIdToken(idToken);

			tokenService.setToken(res.token);

			const profile = await authService.getUserProfile();

			dispatch(setUser(profile));

			const userRole = profile.role;

			if (userRole === 'STUDENT') {
				navigate('/student');
			}
			if (userRole === 'TEACHER') {
				navigate('/teacher');
			}
			if (userRole === 'ADMIN') {
				navigate('/admin');
			}
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
										<button type='submit'>
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
										<p>Sign In with Google</p>
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
