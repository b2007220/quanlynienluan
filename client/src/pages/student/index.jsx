import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import enrollService from '../../services/enroll.service';
import reportService from '../../services/report.service';
import style from '../css/style.module.css';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Pagination from '@mui/material/Pagination';

const yesterday = new Date(Date.now() - 86400000);
const validationSchema = Yup.object().shape({
	doneJob: Yup.string().required('Vui lòng điền công việc đã hoàn thành'),
	nextJob: Yup.string().required('Vui lòng điền công việc tiếp theo'),
	promiseAt: Yup.date().min(yesterday).required('Vui lòng điền thời hạn'),
});

export default function Student_Home() {
	const MySwal = withReactContent(Swal);
	const [page, setPage] = useState(0);
	const [reportList, setReportList] = useState({
		data: [],
	});

	const [enroll, setEnroll] = useState();
	const user = useSelector((state) => state.user);
	useEffect(() => {
		enrollService.getFromStudent().then((enroll) => {
			setEnroll(enroll);
			reportService.getReportsByEnroll(enroll.id, page).then((res) => {
				setReportList(res);
				console.log(res);
			});
		});
	}, [page]);

	const handleCreateNewReport = async (values) => {
		try {
			const newReport = await reportService.createReport({ ...values, enrollId: enroll.id });
			setReportList((prev) => {
				return {
					...prev,
					data: [...prev.data, newReport],
				};
			});
			MySwal.fire({
				icon: 'success',
				title: 'Thêm báo cáo thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
	if (!user) return null;
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
							<td>Chỉnh sửa</td>
						</tr>
					</thead>
					{reportList.data.map((report) => (
						<tbody key={report.id}>
							<tr>
								<td>{dayjs(report.createAt).format('DD-MM-YYYY')}</td>
								<td>{report.doneJob}</td>
								<td>{report.nextJob}</td>
								<td>{dayjs(report.promiseAt).format('DD-MM-YYYY')}</td>
								<td></td>
							</tr>
						</tbody>
					))}
				</table>
				<Pagination
					count={reportList.total}
					page={page + 1}
					onChange={(_, page) => setPage(page - 1)}
					variant='outlined'
					shape='rounded'
					sx={{
						marginTop: '10px',
					}}
				/>
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
					}}
					validationSchema={validationSchema}
					onSubmit={handleCreateNewReport}
				>
					{({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Thời hạn</span>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DatePicker
												value={dayjs(values.promiseAt)}
												error={!!errors.promiseAt}
												onChange={(d) => setFieldValue('promiseAt', d)}
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
