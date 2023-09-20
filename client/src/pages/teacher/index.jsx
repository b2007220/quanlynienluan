import DoneIcon from '@mui/icons-material/Done';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import enrollService from '../../services/enroll.service';
import reportService from '../../services/report.service';
import semesterService from '../../services/semester.service';
import style from '../css/style.module.css';
export default function Student_Home() {
	const date = new Date();
	const [reportList, setReportList] = useState([]);
	const [semester, setSemester] = useState([]);
	const [enrollList, setEnrollList] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				semesterService.getSemestersByYearName(date.getFullYear()).then((res) => {
					setSemester(res);
				});
				{
					semester.map((semester) => {
						const dateStart = new Date(semester.startAt);
						const dateEnd = new Date(semester.endAt);
						if (dateStart <= date.getUTCDate <= dateEnd) {
							const presentSemesterId = semester.id;
							enrollService.getEnrollsBySemesterIdAndTeacherId(presentSemesterId, user.id).then((res) => {
								setEnrollList(res);
							});
						}
					});
				}
				{
					enrollList.map((enroll) => {
						reportService.getReportsByEnrollId(enroll.id).then((res) => {
							setReportList(res);
						});
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handleSearchReport = async (userId) => {
		try {
			const reports = await reportService.getReportsFromUser(userId);
			setReportList([]);
			setReportList(reports);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Lịch sử báo cáo</h2>
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
					<h2>Lịch sử báo cáo</h2>
				</div>
				<table>
					<thead>
						<tr>
							<td>Họ và tên</td>
							<td>Đề tài</td>
							<td>Trạng thái</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					{enrollList.map((enroll) => (
						<tbody key={enroll.id}>
							<tr>
								<td>{enroll.user.fullName}</td>
								{enroll.state === 'WAIT' && <td className={style.status__wait}>Chờ duyệt</td>}
								{enroll.state === 'IN_PROCESS' && (
									<td className={style.status__process}>Đang thực hiện</td>
								)}
								{enroll.state === 'DONE' && <td className={style.status__finish}>Hoàn thành</td>}
								{enroll.state === 'PROPOSE' && <td className={style.status__request}>Đề xuất</td>}
								<td>{enroll.use.topic.name}</td>
								<td>
									<IconButton onClick={() => handleSearchReport(enroll.user.id)} color='primary'>
										<FileOpenIcon></FileOpenIcon>
									</IconButton>
									<IconButton>
										<DoneIcon></DoneIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
}
