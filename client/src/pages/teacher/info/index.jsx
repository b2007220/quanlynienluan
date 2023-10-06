import style from '../../css/style.module.css';
import { useEffect, useState } from 'react';
import authService from '../../../services/auth.service';
import { Select, MenuItem, FormControl } from '@mui/material';
import majorService from '../../../services/major.service';
import userService from '../../../services/user.service';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useSelector } from 'react-redux';
const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Fullname is required'),
	gender: Yup.string().required().oneOf(['MALE', 'FEMALE', 'HIDDEN']),
	schoolId: Yup.string().required('SchoolID is required'),
	majorId: Yup.number().required('Major is required'),
	course: Yup.number().required('Course is required'),
});
const validationSchemaChange = Yup.object().shape({
	oldPassword: Yup.string().required('Mật khẩu cũ không được để trống'),
	newPassword: Yup.string().required('Mật khẩu mới không được để trống'),
});
const validationSchemaCreate = Yup.object().shape({
	password: Yup.string().required('Mật khẩu không được để trống'),
	confirmPassword: Yup.string().required('Xác nhận mật khẩu không được để trống'),
});

export default function Info() {
	const MySwal = withReactContent(Swal);
	const [userInfo, setUserInfo] = useState({});
	const [majorList, setMajorList] = useState({
		data: [],
	});
	useEffect(() => {
		// authService
		// 	.getUserProfile()
		// 	.then((user) => {
		// 		setUserInfo(user);
		majorService.getAllMajors().then((res) => {
			setMajorList(res);
		});
		// 	console.log(userInfo);
		// })
		// .catch((error) => {
		// 	console.log(error);
		// });
	}, []);

	const user = useSelector((state) => state.user);
	

	const handleInfoChange = async () => {
		try {
			const updatedUserInfo = await userService.updateUserById(userInfo.id, userInfo);
			setUserInfo(updatedUserInfo);
		} catch (error) {
			console.log(error);
		}
	};
	const handlePasswordChange = async (values) => {
		try {
			await userService.changePassword(userInfo.id, values.oldPassword, values.newPassword);
			MySwal.fire({
				icon: 'success',
				title: 'Đặt mật khẩu thành công',
				showConfirmButton: false,
				timer: 1500,
			});
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
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Thông tin cá nhân</h2>
				</div>
				<Formik
					initialValues={user || { fullName: '', majorId: '', email: '', gender: '', studentId: '' }}
					validationSchema={validationSchema}
					onSubmit={handleInfoChange}
				>
					{({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row50}>
									<div className={style.input__box}>
										<span>Họ tên</span>
										<input
											type='text'
											autoComplete='off'
											value={values.fullName}
											onChange={handleChange}
											name='fullName'
										></input>
									</div>
									<div className={style.input__box}>
										<span>Ngành học</span>
										<FormControl fullWidth>
											<Select
												name='majorId'
												value={values.majorId}
												error={!!errors.fullName}
												onChange={handleChange}
												sx={{
													borderRadius: '12px',
													height: '37px',
												}}
											>
												{majorList.data.map((major) => (
													<MenuItem key={major.id} value={major.id}>
														{major.majorName}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								</div>
								<div className={style.row50}>
									<div className={style.input__box}>
										<span>Email</span>
										<input
											type='email'
											name='email'
											value={values.email}
											onChange={handleChange}
											disabled
											required
										></input>
									</div>
									<div className={style.input__box}>
										<span>MGV</span>
										<input
											type='text'
											name='studentId'
											required
											autoComplete='off'
											value={values.studentId}
											onChange={handleChange}
										></input>
									</div>
								</div>
								<div className={style.row25}>
									<div className={style.input__box}>
										<span>Giới tính</span>
										<Select
											value={values.gender}
											name='gender'
											displayEmpty
											onChange={(event) => {
												setFieldValue('gender', event.target.value);
											}}
											sx={{
												padding: '10px',
												outline: 'none',
												border: '1px solid var(--black1)',
												resize: 'none',
												borderRadius: '12px',
												marginBottom: '10px',
												fontSize: '1.1em',
												height: '37px',
											}}
										>
											<MenuItem value='MALE'>Nam</MenuItem>
											<MenuItem value='FEMALE'>Nữ</MenuItem>
											<MenuItem value='HIDĐEN'>Ẩn</MenuItem>
										</Select>
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
