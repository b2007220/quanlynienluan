import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	FormControlLabel,
} from '@mui/material';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useService from '../../../services/use.service';

import * as Yup from 'yup';
const validationSchema = Yup.object().shape({
	code: Yup.string().required('Vui lòng điền mã ngành'),
	majorName: Yup.string().required('Vui lòng điền tên ngành'),
});
const ChangeUse = ({ use, open, onClose, setUseList }) => {
	const MySwal = withReactContent(Swal);
	const handleUseChange = async (values) => {
		try {
			const updatedUse = await useService.updateUseById(use?.id, values);
			setUseList((prev) => {
				return {
					...prev,
					data: prev.data.map((e) => {
						if (e.id === updatedUse.id) return updatedUse;
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
				initialValues={use || { name: '', type: '', describe: '', link: '' }}
				enableReinitialize
				validationSchema={validationSchema}
				onSubmit={handleUseChange}
			>
				{({ values, errors, handleChange, handleSubmit }) => {
					return (
						<>
							<form onSubmit={handleSubmit}>
								<DialogTitle>Đổi thông tin đề tài</DialogTitle>
								<DialogContent>
									<Stack
										spacing={2}
										sx={{
											marginTop: '10px',
										}}
									>
										<FormControl>
											<FormLabel id='demo-radio-buttons-group-label'>Loại</FormLabel>
											<RadioGroup
												aria-labelledby='demo-radio-buttons-group-label'
												onChange={handleChange}
												value={values.type}
												name='radio-buttons-group'
											>
												<FormControlLabel
													value='BASIS'
													control={<Radio />}
													label='Niên luận cơ sở'
												/>
												<FormControlLabel
													value='MASTER'
													control={<Radio />}
													label='Niên luận ngành'
												/>
											</RadioGroup>
										</FormControl>
										<TextField
											label='Tên đề tài'
											placeholder='Tên đề tài'
											name='name'
											error={!!errors.name}
											helperText={errors.name}
											value={values.name}
											onChange={handleChange}
										/>
										<TextField
											label='Miêu tả đề tài'
											placeholder='Miêu tả đề tài'
											name='describe'
											row={3}
											error={!!errors.describe}
											helperText={errors.describe}
											value={values.describe}
											onChange={handleChange}
										/>
										<TextField
											label='Link tham khảo'
											placeholder='Link tham khảo'
											name='link'
											row={4}
											error={!!errors.link}
											helperText={errors.link}
											value={values.link}
											onChange={link}
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
export default ChangeUse;
