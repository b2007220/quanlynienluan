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

const validationSchema = Yup.object().shape({
	code: Yup.string().required('Vui lòng điền mã ngành'),
	majorName: Yup.string().required('Vui lòng điền tên ngành'),
});

const CreateMajor = ({ open, handleClose }) => {
	<Dialog open={open} onClose={handleClose}>
		<Formik
			initialValues={{
				code: '',
				majorName: '',
			}}
			validationSchema={validationSchema}
			onSubmit={handleSemeterCreate}
		>
			{({ values, errors, handleChange, handleSubmit }) => {
				return (
					<>
						<form onSubmit={handleSubmit}>
							<DialogTitle>Tạo chuyên ngành</DialogTitle>
							<DialogContent>
								<Stack
									spacing={2}
									sx={{
										marginTop: '10px',
									}}
								>
									<TextField
										label='Mã ngành'
										placeholder='Mã ngành'
										name='code'
										error={!!errors.code}
										helperText={errors.code}
										value={values.code}
										onChange={handleChange}
									/>
									<TextField
										label='Tên ngành'
										placeholder='Tên ngành'
										name='majorName'
										error={!!errors.majorName}
										helperText={errors.majorName}
										value={values.majorName}
										onChange={handleChange}
									/>
								</Stack>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleSubmit} variant='contained'>
									Thêm chuyên ngành
								</Button>
							</DialogActions>
						</form>
					</>
				);
			}}
		</Formik>
	</Dialog>;
};
export default CreateMajor;
