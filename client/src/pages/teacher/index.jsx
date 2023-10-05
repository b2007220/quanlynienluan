import { ArrowDropDown } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import enrollService from '../../services/enroll.service';
import reportService from '../../services/report.service';
import style from '../css/style.module.css';
import { Collapse } from '@mui/material';

function Row({ row }) {
	const [open, setOpen] = useState(false);

	const toggleCollapse = () => setOpen(!open);

	return (
		<>
			<TableRow>
				<TableCell>
					<IconButton onClick={toggleCollapse}>
						<ArrowDropDown sx={{
							transition: 'all 0.3s ease',
							transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
						}} />
					</IconButton>

					Tran Phuoc An
				</TableCell>
				<TableCell></TableCell>
				<TableCell></TableCell>
				<TableCell></TableCell>
				<TableCell></TableCell>
				<TableCell></TableCell>
			</TableRow>

			<TableRow>
				<TableCell colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Table >
							<TableHead>
								<TableCell>Ngày báo cáo</TableCell>
								<TableCell>Nội dung</TableCell>
								<TableCell>File</TableCell>
								<TableCell>Trạng thái</TableCell>
								<TableCell></TableCell>
							</TableHead>

							<TableBody>
								<TableRow>
									<TableCell>

									</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell>
										<button className={style.btn__edit}>Xem</button>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
}

export default function Teacher_Home() {
	const [page, setPage] = useState(0);
	const [reportList, setReportList] = useState([]);
	const [enrollList, setEnrollList] = useState({
		data: [],
	});
	useEffect(() => {
		
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
				<Table>
					<TableHead>
						<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
							<TableCell component='th' scope='row'>
								Họ tên
							</TableCell>
							<TableCell>MSSV</TableCell>
							<TableCell>Đề tài</TableCell>
							<TableCell>Loại đề tài</TableCell>
							<TableCell>Năm học</TableCell>
							<TableCell>Học kỳ</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						<Row />
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
// {enroll.state === 'WAIT' && <td className={style.status__wait}>Chờ duyệt</td>}
// 						{enroll.state === 'IN_PROCESS' && <td className={style.status__process}>Đang thực hiện</td>}
// 						{enroll.state === 'DONE' && <td className={style.status__finish}>Hoàn thành</td>}
// 						{enroll.state === 'PROPOSE' && <td className={style.status__request}>Đề xuất</td>}
