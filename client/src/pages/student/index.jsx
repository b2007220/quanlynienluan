import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import semesterService from '../../services/semester.service';
import style from '../css/style.module.css';
import enrollService from '../../services/enroll.service';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	fullName: Yup.string().required('Fullname is required'),
	gender: Yup.string().required().oneOf(['MALE', 'FEMALE', 'HIDDEN']),
	schoolId: Yup.string().required('SchoolID is required'),
	majorId: Yup.number().required('Major is required'),
	course: Yup.number().required('Course is required'),
});

export default function Student_Home() {
	const [reportList, setReportList] = useState([]);
	const [enroll, setEnroll] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				const semester = semesterService.getCurrent();
				enrollService.getEnrollByStudentIdInSmester(user.id, semester.id).then((enroll) => {
					setEnroll(enroll);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleCreateNewReport = async (values) => {
		try {
			const newreport = await userService.createUser(values);

			setUserList([...userList, newUser]);

			setIsOpenCreateModal(false);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Lịch sử báo cáo</h2>
				</div>
				<table>
					<thead>
						<tr>
							<td>Ngày báo cáo</td>
							<td>Nội dung đã thực hiện</td>
							<td>Nội dung công việc tiếp theo</td>
							<td>Thời hạn thực hiện</td>
						</tr>
					</thead>
					{reportList.map((report) => (
						<tbody key={report.id}>
							<tr>
								<td>{report.createAt}</td>
								<td>{report.doneJob}</td>
								<td>{report.nextJob}</td>
								<td>{report.promiseAt}</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Thêm báo cáo mới</h2>
					<Formik
						initialValues={{
							fullName: userInfo.fullName,
							email: userInfo.email,
							schoolId: userInfo.schoolId,
							majorId: '',
							gender: userInfo.gender,
							course: userInfo.course,
						}}
						validationSchema={validationSchema}
						onSubmit={handleCreateNewReport}
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
												value={values.fullName}
												onChange={handleChange}
												name='fullName'
											></input>
										</div>
										<div className={style.input__box}>
											<span>Ngành học</span>
											<Select
												name='majorId'
												displayEmpty
												error={!!errors.fullName}
												onChange={(event) => {
													setFieldValue('majorId', event.target.value);
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
												{majorList.map((major) => (
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
											<input
												type='email'
												name='email'
												value={values.email}
												disabled
												required
											></input>
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
			</div>
		</div>
	);
}
