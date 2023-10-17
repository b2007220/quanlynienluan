import { FormControl, IconButton, MenuItem, Pagination, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import style from '../../css/style.module.css';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import * as Yup from 'yup';
import semesterService from '../../../services/semester.service';
import yearService from '../../../services/year.service';
import ChangeSemester from './changesemeter';
const validationSchema = Yup.object().shape({
	name: Yup.string().oneOf(['FIRST', 'SECOND', 'SUMMER']),
	startAt: Yup.date().required(),
	endAt: Yup.date().required().min(Yup.ref('startAt')),
	yearId: Yup.number().required('Vui lòng điền năm'),
});

export default function Semester() {
	const MySwal = withReactContent(Swal);
	const [page, setPage] = useState(0);
	const [semesterList, setSemesterList] = useState({
		data: [],
	});
	const [yearList, setYearList] = useState({
		data: [],
	});
	const [editSemester, setEditSemester] = useState(null);

	useEffect(() => {
		semesterService.getAllSemesters(page).then((res) => {
			setSemesterList(res);
		});
		yearService.getAllYears(page).then((res) => {
			setYearList(res);
		});
	}, [page]);
	const handleSemesterDelete = async (semester) => {
		try {
			await semesterService.deleteSemesterById(semester.id);
			setSemesterList((prev) => {
				return { ...prev, data: prev.data.filter((e) => e.id !== semester.id) };
			});
			MySwal.fire({
				icon: 'success',
				title: 'Xóa thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleSemesterCreate = async (values) => {
		try {
			const newSemester = await semesterService.createSemester(values);
			setSemesterList((prev) => {
				return {
					...prev,
					data: [...prev.data, newSemester],
				};
			});
			MySwal.fire({
				icon: 'success',
				title: 'Thêm thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleSemesterActive = async (semester) => {
		try {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});

			swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn kích hoạt học kì?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						const updatedSemester = await semesterService.activeSemester(semester.id);
						setSemesterList((prev) => {
							return {
								...prev,
								data: prev.data.map((e) => {
									if (e.id === updatedSemester.id) return updatedSemester;
									return {
										...e,
										isCurrent: false,
									};
								}),
							};
						});
						swalWithBootstrapButtons.fire('Thành công!', 'Kích hoạt thành công.', 'success');
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						swalWithBootstrapButtons.fire('Hủy bỏ', 'Thao tác được hủy bỏ.', 'error');
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	console.log(semesterList);
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Học kì</h2>
				</div>
				<table>
					<thead>
						<tr>
							<td>Tên học kì</td>
							<td>Thời gian bắt đầu</td>
							<td>Thời gian kết thúc</td>
							<td>Năm học</td>
							<td>Học kì hiện tại</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					{semesterList.data.map((semester) => (
						<tbody key={semester.id}>
							<tr>
								{semester.name === 'FIRST' ? (
									<td>Học kì một</td>
								) : semester.name === 'SECOND' ? (
									<td>Học kì hai</td>
								) : (
									<td>Học kì hè</td>
								)}
								<td>{dayjs(semester.startAt).format('DD-MM-YYYY')}</td>
								<td>{dayjs(semester.endAt).format('DD-MM-YYYY')}</td>
								<td>{semester.year.name}</td>
								{semester.isCurrent ? <td>Đang mở</td> : <td>Đã đóng</td>}
								<td>
									<IconButton onClick={() => setEditSemester(semester)} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
									<IconButton onClick={() => handleSemesterDelete(semester)} color='primary'>
										<DeleteIcon></DeleteIcon>
									</IconButton>
									<IconButton onClick={() => handleSemesterActive(semester)} color='primary'>
										<EditCalendarIcon></EditCalendarIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
				<Pagination
					count={semesterList.total}
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
					<h2>Thêm học kì</h2>
				</div>
				<Formik
					initialValues={{
						name: '',
						startAt: '',
						endAt: '',
						yearId: '',
					}}
					onSubmit={handleSemesterCreate}
					validationSchema={validationSchema}
				>
					{({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Tên học kì</span>
										<FormControl fullWidth>
											<Select
												name='name'
												value={values.name}
												error={!!errors.name}
												onChange={handleChange}
												sx={{
													borderRadius: '12px',
													height: '45px',
												}}
											>
												<MenuItem value='FIRST'>Học kì một</MenuItem>
												<MenuItem value='SECOND'>Học kì hai</MenuItem>
												<MenuItem value='SUMMER'>Học kì hè</MenuItem>
											</Select>
										</FormControl>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Thời gian bắt đầu</span>
										<DatePicker
											value={values.startAt}
											onChange={(d) => setFieldValue('startAt', d)}
											error={!!errors.startAt}
										/>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Thời gian kết thúc</span>
										<DatePicker
											value={values.endAt}
											onChange={(d) => setFieldValue('endAt', d)}
											error={!!errors.endAt}
										/>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Chọn năm học</span>
										<FormControl fullWidth>
											<Select
												name='yearId'
												value={values.yearId}
												error={!!errors.yearId}
												onChange={handleChange}
												sx={{
													borderRadius: '12px',

													height: '45px',
												}}
											>
												{yearList.data.map((year) => (
													<MenuItem key={year.id} value={year.id}>
														{year.name}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input 
										className={style.input__box_input}
										type='submit' value='Tạo học kì' onClick={handleSubmit}></input>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
			<ChangeSemester
				semester={editSemester}
				setSemesterList={setSemesterList}
				open={!!editSemester}
				onClose={() => setEditSemester(null)}
			/>
		</div>
	);
}
