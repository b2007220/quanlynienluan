import { useEffect, useState } from 'react';
import semesterService from '../../../services/semester.service';
import authService from '../../../services/auth.service';
import style from '../../css/style.module.css';
import {
	IconButton,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	FormControl,
	Stack,
	MenuItem,
	InputLabel,
	Select,
	FormHelperText,
	DialogActions,
	Button,
} from '@mui/material';
import { Formik } from 'formik';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';
import SchoolIcon from '@mui/icons-material/School';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import yearService from '../../../services/year.service';
import majorService from '../../../services/major.service';
import CreateIcon from '@mui/icons-material/Create';
export default function Student_Home() {
	const validationSchema = Yup.object().shape({
		name: Yup.string().oneOf(['FIRST', 'SECOND', 'SUMMER']),
		startAt: Yup.date().required(),
		endAt: Yup.date().required(),
		year: Yup.string().required().required('Vui lòng điền năm'),
	});
	const MySwal = withReactContent(Swal);
	const [semesterList, setSemesterList] = useState([]);
	const [majorList, setMajorList] = useState([]);
	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

	useEffect(() => {
		authService
			.getUserProfile()
			.then(() => {
				semesterService.getAllSemesters().then((res) => {
					setSemesterList(res);
					console.log(res);
				});
				majorService.getAllMajors().then((res) => {
					setMajorList(res);
					console.log(res);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleSemester = async (values) => {
		try {
			const newYear = await yearService.createYear(values.year);
			const newSemester = await semesterService.createSemester(values);

			setSemesterList([...semesterList, newSemester]);

			setIsOpenCreateModal(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleMajorChange = async (major) => {
		try {
			const updatedMajor = await majorService.updateMajorById(major.id, major);
			const majorIndex = majorList.findIndex((m) => m.id === major.id);
			if (majorIndex !== -1) {
				const updatedMajorList = [...majorList];
				updatedMajorList[majorIndex] = { ...major, name: updatedMajor.name };
				setMajorList(updatedMajorList);
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Bảng học kì</h2>
					<IconButton
						variant='contained'
						onClick={() => {
							setIsOpenCreateModal(true);
						}}
						color='primary'
					>
						<AddIcon></AddIcon>
					</IconButton>
				</div>
				<table>
					<thead>
						<tr>
							<td>Học kì</td>
							<td>Ngày bắt đầu</td>
							<td>Ngày kết thúc</td>
							<td>Năm</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					{semesterList.map((semester) => (
						<tbody key={semester.id}>
							<tr>
								<td>{semester.name}</td>
								<td>{semester.startAt}</td>
								<td>{semester.endAt}</td>
								<td>{semester.year.name}</td>
							</tr>
						</tbody>
					))}
				</table>
				<Dialog
					open={isOpenCreateModal}
					onClose={() => {
						setIsOpenCreateModal(false);
					}}
				>
					<Formik
						initialValues={{
							name: '',
							startAt: '',
							endAt: '',
							year: '',
						}}
						validationSchema={validationSchema}
						onSubmit={handleSemester}
					>
						{({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
							return (
								<>
									<form onSubmit={handleSubmit}>
										<DialogTitle>Create user</DialogTitle>
										<DialogContent>
											<Stack
												spacing={2}
												sx={{
													marginTop: '10px',
												}}
											>
												<FormControl error={!!errors.name}>
													<InputLabel>Học kì</InputLabel>
													<Select
														name='name'
														label='Học kì'
														placeholder='Học kì'
														value={values.name}
														error={!!errors.name}
														onChange={(event) => {
															setFieldValue('name', event.target.value);
														}}
													>
														<MenuItem value='FIRST'>Học kì một</MenuItem>
														<MenuItem value='SECOND'>Học kì hai</MenuItem>
														<MenuItem value='SUMMER'>Học kì hè</MenuItem>
													</Select>
													<FormHelperText>{errors.gender}</FormHelperText>
												</FormControl>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DatePicker label='Ngày bắt đầu' />
												</LocalizationProvider>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<DatePicker label='Ngày kết thúc' />
												</LocalizationProvider>
												<TextField
													label='Năm'
													placeholder='Năm'
													name='year'
													error={!!errors.year}
													helperText={errors.year}
													value={values.year}
													onChange={handleChange}
												/>
											</Stack>
										</DialogContent>
										<DialogActions>
											<Button onClick={handleSubmit} variant='contained'>
												Thêm năm
											</Button>
										</DialogActions>
									</form>
								</>
							);
						}}
					</Formik>
				</Dialog>
			</div>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Ngành học</h2>
					<IconButton
						variant='contained'
						onClick={() => {
							setIsOpenCreateModal(true);
						}}
						color='primary'
					>
						<AddIcon></AddIcon>
					</IconButton>
				</div>
				<table>
					<thead>
						<tr>
							<td>Mã ngành</td>
							<td>Tên ngành</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					{majorList.map((major) => (
						<tbody key={major.id}>
							<tr>
								<td>{major.code}</td>
								<td>{major.name}</td>
								<td>
									<IconButton onClick={() => handleMajorChange(major)} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
}
