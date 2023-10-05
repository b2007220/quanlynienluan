import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import authService from '../../../services/auth.service';
import enrollService from '../../../services/enroll.service';
import reportService from '../../../services/report.service';
import style from '../../css/style.module.css';
export default function Enroll() {
	const [page, setPage] = useState(0);
	const [reportList, setReportList] = useState();
	const [enrollList, setEnrollList] = useState({
		data: [],
	});
	const [open, setOpen] = useState(false);
	useEffect(() => {
		authService.getUserProfile().then((user) => {
			enrollService.getEnrollsFromTeacher(user.id).then((enrolls) => {
				setEnrollList(enrolls);
			});
			enrollList.data.map((enroll) => {
				reportService.getReportsByEnroll(enroll.id).then((reports) => {
					setReportList(reports);
				});
			});
		});
	}, [page]);
	// const handleSearchReport = async (userId) => {
	// 	try {
	// 		const reports = await reportService.getReportsFromUser(userId);
	// 		setReportList([]);
	// 		setReportList(reports);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	return (
		<div className={style.detail}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Lịch sử báo cáo</h2>
				</div>
				<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
					<TableCell>
						<IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
							{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
						</IconButton>
					</TableCell>
					<TableCell component='th' scope='row'>
						Họ tên
					</TableCell>
					<TableCell>Đề tài</TableCell>
					<TableCell>Trạng thái</TableCell>
					<TableCell>Tương tác</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
						<Collapse in={open} timeout='auto' unmountOnExit>
							<Box sx={{ margin: 1 }}>
								<Typography variant='h6' gutterBottom component='div'>
									Tiến độ báo cáo
								</Typography>
								<Table size='small' aria-label='purchases'>
									<TableHead>
										<TableRow>
											<TableCell>Ngày báo cáo</TableCell>
											<TableCell>Công việc đã hoàn thành</TableCell>
											<TableCell>Công việc sắp tới</TableCell>
											<TableCell>Thời hạn</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										<TableRow>
											<TableCell component='th' scope='row'>
												chuối
											</TableCell>
											<TableCell>chuối</TableCell>
											<TableCell>chuối</TableCell>
											<TableCell>chuối</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</div>
		</div>
	);
}
// {enroll.state === 'WAIT' && <td className={style.status__wait}>Chờ duyệt</td>}
// 						{enroll.state === 'IN_PROCESS' && <td className={style.status__process}>Đang thực hiện</td>}
// 						{enroll.state === 'DONE' && <td className={style.status__finish}>Hoàn thành</td>}
// 						{enroll.state === 'PROPOSE' && <td className={style.status__request}>Đề xuất</td>}
