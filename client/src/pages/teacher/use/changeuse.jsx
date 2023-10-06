import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Stack,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import useService from '../../../services/use.service';
import topicService from '../../../services/topic.service';
import * as yup from 'yup';
const validationSchema = yup.object({
	name: yup.string().required('Vui lòng nhập tên đề tài'),
	describe: yup.string().required('Vui lòng nhập mô tả đề tài'),
	type: yup.string().required().oneOf(['BASIS', 'MASTER']),
	link: yup.string().required('Vui lòng nhập link tham khảo'),
});

const ChangeUse = ({ use, open, onClose, setUseList }) => {
	const MySwal = withReactContent(Swal);

	const handleUseChange = async (values) => {
		try {
			console.log(values);
			const topic = await topicService.updateTopicById(use?.topic.id, values);
			console.log(topic);
			const updatedUse = await useService.getUseById(use.id);
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
				initialValues={
					{
						name: use?.topic.name,
						describe: use?.topic.describe,
						link: use?.topic.link,
						type: use?.topic.type,
					} || { name: '', type: '', describe: '', link: '' }
				}
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
												row
												aria-labelledby='demo-radio-buttons-group-label'
												onChange={handleChange}
												value={values.type}
												name='radio-buttons-group'
											>
												<FormControlLabel value='BASIS' control={<Radio />} label='Cơ sở' />
												<FormControlLabel value='MASTER' control={<Radio />} label='Ngành' />
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
											error={!!errors.describe}
											helperText={errors.describe}
											value={values.describe}
											onChange={handleChange}
										/>
										<TextField
											label='Link tham khảo'
											placeholder='Link tham khảo'
											name='link'
											error={!!errors.link}
											helperText={errors.link}
											value={values.link}
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
export default ChangeUse;
