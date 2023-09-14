import { Box, Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import reportService from '../../services/report.service';
import { useEffect, useState } from 'react';
import enrollService from '../../services/enroll.service';
import gradeService from '../../services/grade.service';
import useService from '../../services/use.service';
import authService from '../../services/auth.service';
import style from '../css/style.module.css';

export default function Student_Home() {
	const [reportList, setReportList] = useState([]);
	const [grade, setGrade] = useState([]);
	const [enroll, setEnroll] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				enrollService.getEnrollsByStudentIdInSemester(user.id).then((res) => {
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
					<tbody>
						<tr>
							<td>Điểm chuyên cần</td>
							<td>1</td>
							<td>Mỗi lần điền báo cáo (đúng tiến độ) vào bảng bên trên sẽ được 0.2</td>
						</tr>
						<tr>
							<td>Điểm quyển báo cáo</td>
							<td>4</td>
							<td>Quyển báo cáo: nội dung phù hợp, bố cục đúng qui định. Trình bày báo cáo.</td>
						</tr>
						<tr>
							<td>Điểm chương trình</td>
							<td>5</td>
							<td>Đúng theo bản thiết kế, phù hợp với đề tài. Ý tưởng mới, có tính sáng tạo</td>
						</tr>
						<tr>
							<td>Tổng</td>
							<td>10</td>
							<td></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
}
