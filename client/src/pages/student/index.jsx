import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import authService from '../../services/auth.service';
import enrollService from '../../services/enroll.service';
import reportService from '../../services/report.service';
import semesterService from '../../services/semester.service';
import style from '../css/style.module.css';

const yesterday = new Date(Date.now() - 86400000);
const validationSchema = Yup.object().shape({
	doneJob: Yup.string().required('Vui lòng điền công việc đã hoàn thành'),
	nextJob: Yup.string().required('Vui lòng điền công việc tiếp theo'),
	promiseAt: Yup.date().min(yesterday).required('Vui lòng điền thời hạn'),
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
				reportService.getReportByEnrollId(enroll.id).then((report) => {
					setReportList(report);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleCreateNewReport = async (values) => {
		try {
			if (enroll.id === undefined) {
				MySwal.fire({
					icon: 'error',
					title: 'Bạn chưa đăng ký đề tài',
					showConfirmButton: false,
					timer: 1500,
				});
				return;
			}
			const newReport = await reportService.createReport(values);
			setReportList([...userList, newReport]);
			MySwal.fire({
				icon: 'success',
				title: 'Xóa thành công',
				showConfirmButton: false,
				timer: 1500,
			});
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
				</div>
				<Formik
					initialValues={{
						doneJob: '',
						nextJob: '',
						promiseAt: '',
						enrollId: enroll.id,
					}}
					validationSchema={validationSchema}
					onSubmit={handleCreateNewReport}
				>
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Thời hạn</span>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DatePicker
												value={values.endAt}
												error={!!errors.endAt}
												slotProps={{
													textField: {
														variant: 'standard',
													},
												}}
											/>
										</LocalizationProvider>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Công việc đã hoàn thành</span>
										<textarea
											name='doneJob'
											rows='5'
											onChange={handleChange}
											value={values.doneJob}
											error={!!errors.doneJob}
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Công việc sắp tới</span>
										<textarea
											name='nextJob'
											rows='5'
											onChange={handleChange}
											value={values.nextJob}
											error={!!errors.nextJob}
										></textarea>
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
	);
}
