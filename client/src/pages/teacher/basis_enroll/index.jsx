import { ArrowDropDown } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import style from '../../css/style.module.css';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import enrollService from '../../../services/enroll.service';
import reportService from '../../../services/report.service';
import Pagination from '@mui/material/Pagination';

function Row({ enroll }) {
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [reportList, setReportList] = useState({
		data: [],
	});
	const toggleCollapse = () => setOpen(!open);

	// useEffect(() => {
	// 	reportService.getReportsByEnroll(enroll.id).then((res) => {
	// 		setReportList(res);
	// 	});
	// }, []);

	return (
		<>
			<TableRow
				sx={{
					'&:hover .MuiTableCell-root, &:hover .MuiTableCell-root span.material-icons-outlined': {
						color: '#fff',
					},
				}}
			>
				<TableCell>
					<IconButton onClick={toggleCollapse}>
						<ArrowDropDown
							sx={{
								transition: 'all 0.3s ease',
								transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
							}}
						/>
					</IconButton>
					{enroll.user.fullName}
				</TableCell>
				<TableCell>{enroll.user.schoolId}</TableCell>
				<TableCell></TableCell>
				{enroll.state === 'WAIT' && <TableCell>Chờ duyệt</TableCell>}
				{enroll.state === 'IN_PROCESS' && <TableCell>Đang thực hiện</TableCell>}
				{enroll.state === 'DONE' && <TableCell>Hoàn thành</TableCell>}
				{enroll.state === 'PROPOSE' && <TableCell>Đề xuất</TableCell>}
				<TableCell>{enroll.use.semesterId}</TableCell>
				<TableCell>{enroll.user.name}</TableCell>
			</TableRow>

			<TableRow
				sx={{
					'&:hover .MuiTableCell-root, &:hover .MuiTableCell-root span.material-icons-outlined': {
						color: '#fff',
					},
				}}
			>
				<TableCell colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Typography variant='h6' gutterBottom component='div'>
							Tiến độ báo cáo
						</Typography>
						<Table>
							<TableHead>
								<TableCell>Ngày báo cáo</TableCell>
								<TableCell>Nội dung</TableCell>
								<TableCell>File</TableCell>
								<TableCell>Trạng thái</TableCell>
								<TableCell></TableCell>
							</TableHead>

							<TableBody>
								<TableRow>
									<TableCell></TableCell>
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
	const [enrollList, setEnrollList] = useState({
		data: [],
	});

	const user = useSelector((state) => state.user);

	useEffect(() => {
		enrollService.getAllFromTeacherBasis(user.id).then((res) => {
			setEnrollList(res);
			console.log(res);
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
	if (!user) return null;
	return (
		<div className={style.detail}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Lịch sử báo cáo</h2>
				</div>
				<Table
					sx={{
						'& .MuiTableRow-root:hover': {
							backgroundColor: '#243b55',
						},
					}}
				>
					<TableHead>
						<TableRow
							sx={{
								'& > *': { borderBottom: 'unset' },
								'&:hover .MuiTableCell-root, &:hover .MuiTableCell-root span.material-icons-outlined': {
									color: '#fff',
								},
							}}
						>
							<TableCell component='th' scope='row'>
								Họ tên
							</TableCell>
							<TableCell>MSSV</TableCell>
							<TableCell>Đề tài</TableCell>
							<TableCell>Loại đề tài</TableCell>
							<TableCell>Năm học</TableCell>
							<TableCell>Học kỳ</TableCell>
							<TableCell>Thao tác</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{enrollList.data.map((enroll) => (
							<Row key={enroll.id} enroll={enroll} />
						))}
					</TableBody>
				</Table>
				<Pagination
					sx={{
						marginTop: '10px',
					}}
					count={enrollList.total}
					page={page + 1}
					onChange={(_, page) => setPage(page - 1)}
					variant='outlined'
					shape='rounded'
				/>
			</div>
		</div>
	);
}
