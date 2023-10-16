import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import reportService from '../../services/report.service';
const yesterday = new Date(Date.now() - 86400000);
const validationSchema = Yup.object().shape({
	doneJob: Yup.string().required('Vui lòng điền công việc đã hoàn thành'),
	nextJob: Yup.string().required('Vui lòng điền công việc tiếp theo'),
	promiseAt: Yup.date().min(yesterday).required('Vui lòng điền thời hạn'),
});
const ChangeReport = ({ report, open, onClose, setReportList }) => {
	const MySwal = withReactContent(Swal);
	const handleReportChange = async (values) => {
		try {
			const updatedReport = await reportService.updateReportById(report?.id, values);
			setReportList((prev) => {
				return {
					...prev,
					data: prev.data.map((e) => {
						if (e.id === updatedReport.id) return updatedReport;
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
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Dialog open={open} onClose={onClose}>
				<Formik
					initialValues={report || { doneJob: '', nextJob: '', promiseAt: '' }}
					validationSchema={validationSchema}
					onSubmit={handleReportChange}
				>
					{({ values, errors, handleChange, handleSubmit, setFieldValue }) => {
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
											<DatePicker
												sx={{
													borderRadius: '12px',
												}}
												value={dayjs(values.promiseAt)}
												onChange={(d) => setFieldValue('promiseAt', d)}
												error={!!errors.promiseAt}
											/>
											<TextField
												fullWidth
												label='Công việc đã hoàn thành'
												value={values.doneJob}
												onChange={handleChange('doneJob')}
												error={!!errors.doneJob}
												helperText={errors.doneJob}
											/>
											<TextField
												fullWidth
												label='Công việc tiếp theo'
												value={values.nextJob}
												onChange={handleChange('nextJob')}
												error={!!errors.nextJob}
												helperText={errors.nextJob}
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
		</LocalizationProvider>
	);
};
export default ChangeReport;
