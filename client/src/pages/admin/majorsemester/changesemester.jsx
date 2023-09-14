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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import * as Yup from 'yup';

const date = new Date();
const year = date.getUTCFullYear();
const validationSchema = Yup.object().shape({
	name: Yup.string().oneOf(['FIRST', 'SECOND', 'SUMMER']),
	startAt: Yup.date().required(),
	endAt: Yup.date().required(),
	year: Yup.number().min(year).required('Vui lòng điền năm'),
});

const ChangeSemeter = ({ open, handleClose }) => {
	<Dialog open={open} onClose={handleClose}>
		<Formik
			initialValues={{
				code: '',
				majorName: '',
			}}
			validationSchema={validationSchema}
			onSubmit={handleMajorChange}
		>
			{({ values, errors, setFieldValue, handleChange, handleSubmit }) => {
				return (
					<>
						<form onSubmit={handleSubmit}>
							<DialogTitle>Đổi thông tin học kì</DialogTitle>
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
									Đổi
								</Button>
							</DialogActions>
						</form>
					</>
				);
			}}
		</Formik>
	</Dialog>;
};
export default ChangeSemeter;
