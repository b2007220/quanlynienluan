import CreateIcon from '@mui/icons-material/Create';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import enrollService from '../../services/enroll.service';
import reportService from '../../services/report.service';
import style from '../css/style.module.css';
import ChangeReport from './changereport';

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

	const [enroll, setEnroll] = useState({});
	const [editReport, setEditReport] = useState(null);
	const user = useSelector((state) => state.user);

	useEffect(() => {
		enrollService.getFromStudent().then((res) => {
			setEnroll(res);
			reportService.getReportsByEnroll(res.id, page).then((res) => {
				setReportList(res);
			});
		});
	}, [page]);
	if (!user) return null;
	const handleCreateNewReport = async (values) => {
		try {
			if (enroll.state !== 'WAIT' || enroll.state !== 'PROPOSE') {
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
			} else {
				MySwal.fire({
					icon: 'error',
					title: 'Thêm báo cáo thất bại',
					text: 'Đề tài chưa được duyệt',
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
					<h2>Lịch sử báo cáo</h2>
					<h3>{enroll.use?.topic.name}</h3>
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
								<td>
									<IconButton onClick={() => setEditReport(report)} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
								</td>
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
					{enroll?.state === 'WAIT' ? (
						<h3>Đề tài chưa được duyệt</h3>
					) : enroll?.state === 'IN_PROCESS' ? (
						<h3>Đề tài đang được thực hiện</h3>
					) : enroll?.state === 'DONE' ? (
						<h3>Đề tài đã hoàn thành</h3>
					) : enroll?.state === 'PROPOSE' ?(
						<h3>Đề tài đang đợi được cho phép</h3>
					) : null}
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
										<DatePicker
											value={dayjs(values.promiseAt)}
											error={!!errors.promiseAt}
											onChange={(d) => setFieldValue('promiseAt', d)}
										/>
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
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input
											className={style.input__box_input}
											type='submit'
											value='Thêm báo cáo'
											onClick={handleSubmit}
										></input>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
			<ChangeReport
				report={editReport}
				setReportList={setReportList}
				open={!!editReport}
				onClose={() => setEditReport(null)}
			/>
		</div>
	);
}
