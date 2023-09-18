import { Dialog, IconButton } from '@mui/material';
import reportService from '../../services/report.service';
import { useEffect, useState } from 'react';
import enrollService from '../../services/enroll.service';
import gradeService from '../../services/grade.service';
import useService from '../../services/use.service';
import authService from '../../services/auth.service';
import style from '../css/style.module.css';
import AddIcon from '@mui/icons-material/Add';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import semesterService from '../../services/semester.service';

export default function Student_Home() {
	const date = new Date();
	const [reportList, setReportList] = useState([]);
	const [grade, setGrade] = useState([]);
	const [enroll, setEnroll] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				const semester = semesterService.getCurrent();
				const enroll = enrollService.getEnrollsByStudentIdInSemester(user.id).then((res) => {
					setEnroll(res);
				});
				reportService.getReportsFromUser(user.id).then((res) => {
					setReportList(res);
				});
				gradeService.getGradeByStudentId(user.id).then((res) => {
					setGrade(res);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const calculateTotalGrade = (grade) => {
		return grade.diligentGrade + grade.reportGrade + grade.programGrade;
	};
	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

	const handleCreateNewReport = async (values) => {
		try {
			const newreport = await userService.createUser(values);

			setUserList([...userList, newUser]);

			setIsOpenCreateModal(false);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Lịch sử báo cáo</h2>
					<IconButton variant='contained' color='primary'>
						<AddIcon></AddIcon>
					</IconButton>
					<Dialog
						open={isOpenCreateModal}
						onClose={() => {
							setIsOpenCreateModal(false);
						}}
					>
						<Formik
							initialValues={{
								createAt: '',
								doneJob: '',
								nextJob: '',
								promiseAt: '',
							}}
							onSubmit={handleCreateNewReport}
						>
							{({ values, handleChange, handleSubmit }) => (
								<form onSubmit={handleSubmit}>
									<DialogTitle>Tạo báo cáo tiến độ</DialogTitle>

									<DialogContent>
										<Stack
											spacing={2}
											sx={{
												marginTop: '10px',
											}}
										>
											<LocalizationProvider dateAdapter={AdapterDayjs} disabled>
												<DatePicker label='Ngày báo cáo' />
											</LocalizationProvider>
											<StyledTextarea minRows={3} placeholder='Minimum 3 rows' />

											<StyledTextarea minRows={3} placeholder='Minimum 3 rows' />
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DatePicker label='Thời hạn' />
											</LocalizationProvider>
										</Stack>
									</DialogContent>

									<DialogActions>
										<Button onClick={handleSubmit} variant='contained'>
											Tạo
										</Button>
									</DialogActions>
								</form>
							)}
						</Formik>
					</Dialog>
				</div>
				<table>
					<thead>
						<tr>
							<td>Ngày báo cáo</td>
							<td>Nội dung đã thực hiện</td>
							<td>Nội dung công việc tiếp theo</td>
							<td>Thời hạn thực hiện</td>
						</tr>
					</thead>
					{reportList.map((report) => (
						<tbody key={report.id}>
							<tr>
								<td>{report.createAt}</td>
								<td>{report.doneJob}</td>
								<td>{report.nextJob}</td>
								<td>{report.promiseAt}</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Thang điểm</h2>
					<span className={enroll.id}>{enroll.state}</span>';
				</div>
				<table>
					<thead>
						<tr>
							<td>Điểm thành phần</td>
							<td>Trọng số</td>
							<td>Quy định</td>
						</tr>
					</thead>
					{grade.map((grade) => (
						<tbody>
							<tr>
								<td>Điểm chuyên cần</td>
								<td>1</td>
								<td>Mỗi lần điền báo cáo (đúng tiến độ) vào bảng bên trên sẽ được 0.2</td>
								<td>{grade.diligentGrade}</td>
							</tr>
							<tr>
								<td>Điểm quyển báo cáo</td>
								<td>4</td>
								<td>Quyển báo cáo: nội dung phù hợp, bố cục đúng qui định. Trình bày báo cáo.</td>
								<td>{grade.reportGrade}</td>
							</tr>
							<tr>
								<td>Điểm chương trình</td>
								<td>5</td>
								<td>Đúng theo bản thiết kế, phù hợp với đề tài. Ý tưởng mới, có tính sáng tạo</td>
								<td>{programGrade}</td>
							</tr>
							<tr>
								<td>Điểm tổng</td>
								<td>10</td>
								<td></td>
								<td>{calculateTotalGrade(grade)}</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
}
