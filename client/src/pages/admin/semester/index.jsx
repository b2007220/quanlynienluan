import { FormControl, IconButton, MenuItem, Select, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import style from '../../css/style.module.css';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
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

	const [isOpenSemesterChangeModal, setIsOpenSemesterChangeModal] = useState(false);

	const handleOpenSemesterChangeModal = () => setIsOpenSemesterChangeModal(true);
	const handleCloseSemesterChangeModal = () => setIsOpenSemesterChangeModal(false);

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
			console.log(values);
			// const newSemester = await semesterService.createSemester(values);
			// setSemesterList((prev) => {
			// 	return {
			// 		...prev,
			// 		data: [...prev.data, newSemester],
			// 	};
			// });
			// MySwal.fire({
			// 	icon: 'success',
			// 	title: 'Thêm thành công',
			// 	showConfirmButton: false,
			// 	timer: 1500,
			// });
		} catch (error) {
			console.log(error);
		}
	};
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
								<td>{semester.name}</td>
								<td>{semester.startAt}</td>
								<td>{semester.endAt}</td>
								<td>{semester.year.name}</td>
								{semester.isCurrent ? <td>Đang mở</td> : <td>Đã đóng</td>}
								<td>
									<IconButton onClick={() => handleOpenSemesterChangeModal()} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
									<ChangeSemester
										id={semester.id}
										setSemesterList={setSemesterList}
										open={isOpenSemesterChangeModal}
										onClose={handleCloseSemesterChangeModal}
									/>
									<IconButton onClick={() => handleSemesterDelete(semester)} color='primary'>
										<DeleteIcon></DeleteIcon>
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
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Tên năm học</span>
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
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DatePicker
												value={values.startAt}
												error={!!errors.startAt}
												slotProps={{ textField: { variant: 'standard' } }}
											/>
										</LocalizationProvider>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Thời gian kết thúc</span>
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
										<input type='submit' value='Tạo học kì' onClick={handleSubmit}></input>
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