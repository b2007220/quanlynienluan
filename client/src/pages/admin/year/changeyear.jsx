import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';
import yearService from '../../../services/year.service';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Vui lòng điền tên năm học'),
});
const ChangeYear = ({ year, open, onClose, setYearList }) => {
	const MySwal = withReactContent(Swal);

	const handleYearChange = async (values) => {
		try {
			const updatedYear = await yearService.updateYearById(year?.id, values);
			setYearList((prev) => {
				return {
					...prev,
					data: prev.data.map((e) => {
						if (e.id === updatedYear.id) return updatedYear;
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
		<Dialog open={open} onClose={onClose}>
			<Formik
				initialValues={year || { name: '' }}
				validationSchema={validationSchema}
				onSubmit={handleYearChange}
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
export default ChangeYear;
