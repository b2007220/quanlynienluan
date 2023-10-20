import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import semesterService from '../../../services/semester.service';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState, useEffect } from 'react';
import yearService from '../../../services/year.service';
import dayjs from 'dayjs';
const validationSchema = Yup.object().shape({
	name: Yup.string().oneOf(['FIRST', 'SECOND', 'SUMMER']),
	startAt: Yup.date().required(),
	endAt: Yup.date().required().min(Yup.ref('startAt')),
	yearId: Yup.number().required('Vui lòng điền năm'),
});
const ChangeSemester = ({ semester, open, onClose, setSemesterList }) => {
	const MySwal = withReactContent(Swal);
	const [yearList, setYearList] = useState({
		data: [],
	});
	useEffect(() => {
		yearService.getAllYears().then((res) => {
			setYearList(res);
		});
	}, []);
	const handleSemesterChange = async (values) => {
		try {
			const updatedSemester = await semesterService.updateSemesterById(semester?.id, values);
			setSemesterList((prev) => {
				return {
					...prev,
					data: prev.data.map((e) => {
						if (e.id === updatedSemester.id) return updatedSemester;
						return e;
					}),
				};
			});
			onClose();
			MySwal.fire({
				icon: 'success',
				title: 'Đổi thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog open={open} onClose={onClose} fullWidth>
			<Formik
				initialValues={semester || { name: '', startAt: '', endAt: '', yearId: '' }}
				validationSchema={validationSchema}
				onSubmit={handleSemesterChange}
			>
				{({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
					return (
						<>
							<form onSubmit={handleSubmit}>
								<DialogTitle>Đổi thông tin năm học</DialogTitle>
								<DialogContent>
									<Stack
										spacing={2}
										sx={{
											marginTop: '10px',
										}}
									>
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
												<MenuItem value='FIRST'>Học kỳ 1</MenuItem>
												<MenuItem value='SECOND'>Học kỳ 2</MenuItem>
												<MenuItem value='SUMMER'>Học kỳ hè</MenuItem>
											</Select>
										</FormControl>
										<DatePicker
											sx={{
												borderRadius: '12px',
											}}
											value={dayjs(values.startAt)}
											onChange={(d) => setFieldValue('startAt', d)}
											error={!!errors.startAt}
										/>
										<DatePicker
											value={dayjs(values.endAt)}
											onChange={(d) => setFieldValue('endAt', d)}
											error={!!errors.endAt}
										/>
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
									</Stack>
								</DialogContent>
								<DialogActions>
									<Button onClick={handleSubmit}>Đổi</Button>
								</DialogActions>
							</form>
						</>
					);
				}}
			</Formik>
		</Dialog>
	);
};
export default ChangeSemester;
