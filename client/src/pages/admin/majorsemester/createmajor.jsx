import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import majorService from '../../../services/major.service';

const validationSchema = Yup.object().shape({
	code: Yup.string().required('Vui lòng điền mã ngành'),
	majorName: Yup.string().required('Vui lòng điền tên ngành'),
});

const CreateMajor = ({ open, onClose, setMajorList }) => {
	const handleMajorCreate = async (values) => {
		try {
			const newMajor = await majorService.createMajor(values);
			setMajorList((majorList) => [...majorList, newMajor]);
			onClose();
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
				onSubmit={handleMajorCreate}
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
		</Dialog>
	);
};
export default CreateMajor;
