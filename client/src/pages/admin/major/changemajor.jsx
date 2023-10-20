import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import majorService from '../../../services/major.service';

import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
	code: Yup.string().required('Vui lòng điền mã ngành'),
	majorName: Yup.string().required('Vui lòng điền tên ngành'),
});
const ChangeMajor = ({ major, open, onClose, setMajorList }) => {
	const MySwal = withReactContent(Swal);
	const handleMajorChange = async (values) => {
		try {
			const updatedMajor = await majorService.updateMajorById(major?.id, values);
			setMajorList((prev) => {
				return {
					...prev,
					data: prev.data.map((e) => {
						if (e.id === updatedMajor.id) return updatedMajor;
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
				initialValues={major || { code: '', majorName: '' }}
				enableReinitialize
				validationSchema={validationSchema}
				onSubmit={handleMajorChange}
			>
				{({ values, errors, handleChange, handleSubmit }) => {
					return (
						<>
							<form onSubmit={handleSubmit}>
								<DialogTitle>Đổi thông tin chuyên ngành</DialogTitle>
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
										Đổi
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
export default ChangeMajor;
