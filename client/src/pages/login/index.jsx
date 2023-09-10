import React, { useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import './login.css';
import { auth } from '../../firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as AiIcons from 'react-icons/ai';
import authService from '../../services/auth.service';
import tokenService from '../../services/token.service';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';

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

			navigate('/');
		} catch (error) {}
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
					<div className='login-box'>
						<h2>Trang đăng nhập</h2>
						<div className='form-container'>
							<form onSubmit={handleSubmit}>
								<div className='user-box'>
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
								<div className='user-box'>
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
						<div className='middle-test'>
							<hr />
						</div>
						<div className='social-sign-in'>
							<button className='input-google' onClick={handleSignIn}>
								<div className='icon'>
									<AiIcons.AiOutlineGooglePlus></AiIcons.AiOutlineGooglePlus>
								</div>
								<p>Sign In with Google</p>
							</button>
						</div>
					</div>
				);
			}}
		</Formik>
	);
}
