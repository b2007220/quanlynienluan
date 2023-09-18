import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Formik } from 'formik';
import * as Yup from 'yup';

const date = new Date();
const year = date.getUTCFullYear();

const validationSchema = Yup.object().shape({
	name: Yup.string().oneOf(['FIRST', 'SECOND', 'SUMMER']),
	startAt: Yup.date().required(),
	endAt: Yup.date().required().min(Yup.ref('startAt')),
	year: Yup.number().min(year).required('Vui lòng điền năm'),
});

const CreateSemester = ({ open, onClose }) => {
	const handleSemeterCreate = async (values) => {
		try {
			const newYear = await yearService.createYear(values.year);
			const newSemester = await semesterService.createSemester(values);

			setSemesterList((semesterList) => [...semesterList, newSemester]);

			setIsOpenSemesterCreateModal(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<Formik
				initialValues={{
					name: '',
					startAt: '',
					endAt: '',
					year: '',
				}}
				validationSchema={validationSchema}
				onSubmit={handleSemeterCreate}
			>
				{({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
					return (
						<>
							<form onSubmit={handleSubmit}>
								<DialogTitle>Tạo học kì</DialogTitle>
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
											<FormHelperText>{errors.name}</FormHelperText>
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
										Thêm học kì
									</Button>
								</DialogActions>
							</form>
						</>
					);
				}}
			</Formik>
		</Dialog>
	);
};
export default CreateSemester;
