import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import authService from '../../../services/auth.service';
import userService from '../../../services/user.service';
import style from '../../css/style.module.css';

const validationSchemaChange = Yup.object().shape({
	oldPassword: Yup.string().required('Mật khẩu cũ không được để trống'),
	newPassword: Yup.string().required('Mật khẩu mới không được để trống'),
});
const validationSchemaCreate = Yup.object().shape({
	password: Yup.string().required('Mật khẩu không được để trống'),
	confirmPassword: Yup.string().required('Xác nhận mật khẩu không được để trống'),
});

export default function Password() {
	const MySwal = withReactContent(Swal);

	const [userInfo, setUserInfo] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				setUserInfo(user);
				console.log(user);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handlePasswordChange = async (values) => {
		try {
			await userService.changePassword(userInfo.id, values.oldPassword, values.newPassword);
		} catch (error) {
			console.log(error);
		}
	};
	const handlePasswordCreate = async (values) => {
		try {
			if (values.password !== values.confirmPassword) {
				MySwal.fire({
					icon: 'error',
					title: 'Mật khẩu không khớp',
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				const user = await userService.createPassword(userInfo.id, values.password);
				MySwal.fire({
					icon: 'success',
					title: 'Đặt mật khẩu thành công',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.details}>
			{userInfo.isSetPassword ? (
				<>
					<div className={style.recentOrders}>
						<div className={style.cardHeader}>
							<h2>Đổi mật khẩu</h2>
						</div>
						<Formik
							initialValues={{
								oldPassword: '',
								newPassword: '',
							}}
							onSubmit={handlePasswordChange}
							validationSchema={validationSchemaChange}
						>
							{({ values, handleChange, handleSubmit }) => {
								return (
									<form onSubmit={handleSubmit}>
										<div className={style.row100}>
											<div className={style.input__box}>
												<span>Mật khẩu cũ</span>
												<input
													type='text'
													autoComplete='off'
													onChange={handleChange}
													value={values.oldPassword}
													required
													name='oldPassword'
												></input>
											</div>
										</div>
										<div className={style.row100}>
											<div className={style.input__box}>
												<span>Mật khẩu mới</span>
												<input
													type='text'
													autoComplete='off'
													required
													onChange={handleChange}
													value={values.newPassword}
													name='newPassword'
												></input>
											</div>
										</div>

										<div className={style.row100}>
											<div className={style.input__box}>
												<input type='submit' value='Cập nhật' onClick={handleSubmit}></input>
											</div>
										</div>
									</form>
								);
							}}
						</Formik>
					</div>
				</>
			) : (
				<>
					<div className={style.recentOrders}>
						<div className={style.cardHeader}>
							<h2>Tạo mật khẩu</h2>
						</div>
						<Formik
							initialValues={{
								password: '',
								confirmPassword: '',
							}}
							onSubmit={handlePasswordCreate}
							validationSchema={validationSchemaCreate}
						>
							{({ values, errors, handleChange, handleSubmit }) => {
								return (
									<form onSubmit={handleSubmit}>
										<div className={style.row100}>
											<div className={style.input__box}>
												<span>Mật khẩu</span>
												<input
													name='password'
													error={!!errors.password}
													onChange={handleChange}
													value={values.password}
												></input>
											</div>
										</div>
										<div className={style.row100}>
											<div className={style.input__box}>
												<span>Xác nhận mật khẩu</span>
												<input
													name='confirmPassword'
													error={!!errors.confirmPassword}
													onChange={handleChange}
													value={values.confirmPassword}
												></input>
											</div>
										</div>

										<div className={style.row100}>
											<div className={style.input__box}>
												<input
													type='submit'
													value='Tạo mật khẩu'
													onClick={handleSubmit}
												></input>
											</div>
										</div>
									</form>
								);
							}}
						</Formik>
					</div>
				</>
			)}
		</div>
	);
}
