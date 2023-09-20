import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';
import yemesterService from '../../../services/semester.service';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const validationSchema = Yup.object().shape({
	name: Yup.string().oneOf(['FIRST', 'SECOND', 'SUMMER']),
	startAt: Yup.date().required(),
	endAt: Yup.date().required().min(Yup.ref('startAt')),
	yearId: Yup.number().required('Vui lòng điền năm'),
});
const ChangeSemester = ({ id, open, onClose, setSList }) => {
	const MySwal = withReactContent(Swal);

	const handleSemesterChange = async (values) => {
		try {
			const updatedSemester = await semesterService.updateSemesterById(id, values);
			setSemesterList((prev) => {
				return prev.map((e) => {
					if (e.id === updatedSemester.id) return updatedSemester;
					return e;
				});
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
		<Dialog open={open} onClose={onClose}>
			<Formik
				initialValues={{
					startAt: '',
					endAt: '',
					name: '',
					yearId: '',
				}}
				validationSchema={validationSchema}
				onSubmit={handleSemesterChange}
			>
				{({ values, errors, handleChange, handleSubmit }) => {
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
										<TextField
											label='Tên năm học'
											placeholder='Tên năm học'
											name='name'
											error={!!errors.code}
											helperText={errors.code}
											value={values.code}
											onChange={handleChange}
										/>
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
