import { Box, Grid, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import reportService from '../../services/report.service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import enrollService from '../../services/enroll.service';

export default function Student_Home() {
	const [reportList, setReportList] = useState([]);
	const [enroll, setEnroll] = useState([]);
	useEffect(() => {
		const userId = useSelector((state) => state.user.id);
		enrollService.getEnrollsByStudentIdInSemester(userId).then((res) => {
			setEnroll(res);
		});
		reportService.getReportsFromUser(userId).then((res) => {
			setReportList(res);
		});
	}, []);

	return (
		<Box
			sx={{
				flexGrow: 1,
			}}
		>
			<Grid container spacing={1}>
				<Grid item xs={8}>
					<Grid container spacing={1}>
						<Grid item xs={2}></Grid>
						<Grid item xs={6}></Grid>
					</Grid>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Ngày báo cáo</TableCell>
								<TableCell>Nội dung đã thực hiện</TableCell>
								<TableCell>Nội dung làm tiếp theo</TableCell>
								<TableCell>Ngày hoàn thành</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reportList.map((report) => (
								<TableRow key={report.id}>
									<TableCell>{report.creatAt}</TableCell>
									<TableCell>{report.doneJob}</TableCell>
									<TableCell>{report.nextJob}</TableCell>
									<TableCell>{report.promiseAt}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
				<Grid item xs={4}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Điểm thành phân</TableCell>
								<TableCell>Trọng số</TableCell>
								<TableCell>Nội dung làm tiếp theo</TableCell>
								<TableCell>Ngày hoàn thành</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{reportList.map((report) => (
								<TableRow key={report.id}>
									<TableCell>{report.creatAt}</TableCell>
									<TableCell>{report.doneJob}</TableCell>
									<TableCell>{report.nextJob}</TableCell>
									<TableCell>{report.promiseAt}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Grid>
			</Grid>
		</Box>
	);
}
