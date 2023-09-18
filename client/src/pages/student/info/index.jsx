import style from '../../css/style.module.css';
import { useEffect, useState } from 'react';
import authService from '../../../services/auth.service';
import { Select, MenuItem } from '@mui/material';
import majorService from '../../../services/major.service';
import userService from '../../../services/user.service';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Fullname is required'),
	gender: Yup.string().required().oneOf(['MALE', 'FEMALE', 'HIDDEN']),
	schoolId: Yup.string().required('SchoolID is required'),
	majorName: Yup.string().required('MajorName is required'),
	course: Yup.number().required('Course is required'),
});
export default function Info() {
	const [userinfo, setUserinfo] = useState([]);
	const [major, setMajor] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				setUserinfo(user);
				majorService.getAllMajors().then((res) => {
					setMajor(res);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handleInfoChange = async () => {
		try {
			const updatedUserInfo = await userService.updateUserById(userinfo.id, userinfo);
			setUserinfo(updatedUserInfo);
		} catch (error) {
			console.log(error);
		}
	};
	const handlePasswordChange = async () => {
		try {
			const updatedUserInfo = await userService.changePassword(userinfo.id, oldPassword, newPassword);
			setUserinfo(updatedUserInfo);
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
					initialValues={{
						fullName: userinfo.fullName,
						email: userinfo.email,
						schoolId: userinfo.schoolId,
						majorName: userinfo.major.majorName,
						gender: userinfo.gender,
						course: userinfo.course,
					}}
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
											error={!!errors.fullName}
											helperText={errors.fullName}
											value={values.fullName}
											onChange={handleChange}
											name='fullName'
										></input>
									</div>
									<div className={style.input__box}>
										<span>Ngành học</span>
										<Select
											name='majorName'
											displayEmpty
											error={!!errors.fullName}
											helperText={errors.fullName}
											onChange={(event) => {
												setFieldValue('majorName', event.target.value);
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
											{major.map((major) => (
												<MenuItem key={major.id} value={major.id}>
													{major.majorName}
												</MenuItem>
											))}
										</Select>
									</div>
								</div>
								<div className={style.row50}>
									<div className={style.input__box}>
										<span>Email</span>
										<input type='email' name='email' value={values.email} disabled required></input>
									</div>
									<div className={style.input__box}>
										<span>MSSV</span>
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
										<span>Khóa</span>
										<input
											type='number'
											min='42'
											name='khoa'
											value={values.course}
											required
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
			{userinfo.isSetPassword ? (
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
				<></>
			)}
		</div>
	);
}
