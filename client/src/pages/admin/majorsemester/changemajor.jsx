import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';

import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
	code: Yup.string().required('Vui lòng điền mã ngành'),
	majorName: Yup.string().required('Vui lòng điền tên ngành'),
});
const ChangeMajor = ({ open, onClose, setMajorList }) => {
	const handleMajorChange = async (major) => {
		try {
			const updatedMajor = await majorService.updateMajorById(major.id, major);
			const majorIndex = majorList.findIndex((m) => m.id === major.id);
			setMajorList((prev) => {
				return prev.map((e) => {
					if (e.id === updatedMajor.id) return updatedMajor;

					return e;
				});
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Dialog open={open} onClose={onClose}>
			<Formik
				initialValues={{
					code: '',
					majorName: '',
				}}
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
