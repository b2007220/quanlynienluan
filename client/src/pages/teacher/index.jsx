import { ArrowDropDown } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import style from '../css/style.module.css';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import enrollService from '../../services/enroll.service';
import reportService from '../../services/report.service';
import Pagination from '@mui/material/Pagination';
import dayjs from 'dayjs';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import useService from '../../services/use.service';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
function Row({ enroll }) {
	const MySwal = withReactContent(Swal);
	const [open, setOpen] = useState(false);
	const [page, setPage] = useState(0);
	const [reportList, setReportList] = useState({
		data: [],
	});
	const toggleCollapse = () => setOpen(!open);

	useEffect(() => {
		reportService.getReportsByEnroll(enroll.id, page).then((res) => {
			setReportList(res);
		});
	}, [page]);
	const handleReuse = async (use) => {
		try {
			await useService.createUse(use);
			MySwal.fire({
				icon: 'success',
				title: 'Thêm đề tài sử dụng thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Đề tài đã có ở học kì này',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};
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
				<TableCell>{enroll.user.schoolId ? enroll.user.schoolId : 'Chưa có'}</TableCell>
				<TableCell>{enroll.use.topic.name}</TableCell>
				{enroll.state === 'WAIT' ? (
					<TableCell>Chờ duyệt</TableCell>
				) : enroll.state === 'IN_PROCESS' ? (
					<TableCell>Đang thực hiện</TableCell>
				) : enroll.state === 'DONE' ? (
					<TableCell>Hoàn thành</TableCell>
				) : (
					<TableCell>Đề xuất</TableCell>
				)}
				{enroll.use.semester.name === 'FIRST' ? (
					<TableCell>Học kì 1</TableCell>
				) : enroll.use.semester.name === 'SECOND' ? (
					<TableCell>Học kì 2</TableCell>
				) : (
					<TableCell>Học kì hè</TableCell>
				)}
				<TableCell>{enroll.use.semester.year.name}</TableCell>
				<TableCell>
					<IconButton onClick={() => handleReuse(enroll.use)} color='primary'>
						<AutorenewIcon></AutorenewIcon>
					</IconButton>
				</TableCell>
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
							</TableHead>

							<TableBody>
								{reportList.data.map((report) => (
									<TableRow key={report.id}>
										<TableCell>{dayjs(report.createdAt).format('DD-MM-YYYY')}</TableCell>
										<TableCell>{dayjs(report.promiseAt).format('DD-MM-YYYY')}</TableCell>
										<TableCell>{report.doneJob}</TableCell>
										<TableCell>{report.nextJob}</TableCell>
									</TableRow>
								))}
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
		enrollService.getAllFromTeacher(user.id, page).then((res) => {
			setEnrollList(res);
			console.log(res);
		});
	}, [page]);

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
							<TableCell>Học kỳ</TableCell>
							<TableCell>Năm học</TableCell>
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
					count={enrollList.total}
					page={page + 1}
					onChange={(_, page) => setPage(page - 1)}
					variant='outlined'
					shape='rounded'
					sx={{
						marginTop: '10px',
					}}
				/>
			</div>
		</div>
	);
}
