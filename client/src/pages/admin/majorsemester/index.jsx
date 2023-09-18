import AddIcon from '@mui/icons-material/Add';
import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import authService from '../../../services/auth.service';
import semesterService from '../../../services/semester.service';
import style from '../../css/style.module.css';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import majorService from '../../../services/major.service';
import ChangeMajor from './changemajor';
import ChangeSemeter from './changesemester';
import CreateMajor from './createmajor';
import CreateSemester from './createsemester';

export default function MajorSemeter() {
	const MySwal = withReactContent(Swal);
	const [semesterList, setSemesterList] = useState([]);
	const [majorList, setMajorList] = useState([]);

	const [isOpenMajorCreateModal, setIsOpenMajorCreateModal] = useState(false);
	const [isOpenSemesterChangeModal, setIsOpenSemesterChangeModal] = useState(false);
	const [isOpenMajorChangeModal, setIsOpenMajorChangeModal] = useState(false);
	const [isOpenSemesterCreateModal, setIsOpenSemesterCreateModal] = useState(false);

	const handleOpenSCrM = () => setIsOpenSemesterCreateModal(true);
	const handleCloseSCrM = () => setIsOpenSemesterCreateModal(false);
	const handleOpenSChM = () => setIsOpenSemesterChangeModal(true);
	const handleCloseSChm = () => setIsOpenSemesterChangeModal(false);
	const handleOpenMCrM = () => setIsOpenMajorCreateModal(true);
	const handleCloseMCrM = () => setIsOpenMajorCreateModal(false);
	const handleOpenMChM = () => setIsOpenMajorChangeModal(true);
	const handleCloseMChM = () => setIsOpenMajorChangeModal(false);

	useEffect(() => {
		authService
			.getUserProfile()
			.then(() => {
				semesterService.getAllSemesters().then((res) => {
					setSemesterList(res);
					console.log(res);
				});
				majorService.getAllMajors().then((res) => {
					setMajorList(res);
					console.log(res);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const handleMajorDelete = async (major) => {
		try {
			await majorService.deleteMajorById(major.id);
			const newMajorList = majorList.filter((m) => m.id !== major.id);
			setMajorList(newMajorList);
			MySwal.fire({
				icon: 'success',
				title: 'Xóa thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleSemesterDelete = async (semester) => {
		try {
			const res = await semesterService.deleteSemesterById(semester.id);
			if (res.status === 200) {
				const newSemesterList = semesterList.filter((s) => s.id !== semester.id);
				setSemesterList(newSemesterList);
				MySwal.fire({
					icon: 'success',
					title: 'Xóa thành công',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Bảng học kì</h2>
					<IconButton variant='contained' onClick={handleOpenSCrM} color='primary'>
						<AddIcon></AddIcon>
					</IconButton>
				</div>
				<table>
					<thead>
						<tr>
							<td>Học kì</td>
							<td>Ngày bắt đầu</td>
							<td>Ngày kết thúc</td>
							<td>Năm</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					{semesterList.map((semester) => (
						<tbody key={semester.id}>
							<tr>
								<td>{semester.name}</td>
								<td>{semester.startAt}</td>
								<td>{semester.endAt}</td>
								<td>{semester.year.name}</td>
								<td>
									<IconButton onClick={handleOpenSChM} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>

									<ChangeSemeter open={isOpenSemesterChangeModal} handleClose={handleCloseSChm} />
									<IconButton onClick={() => handleSemesterDelete(semester)} color='primary'>
										<DeleteIcon></DeleteIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Ngành học</h2>
					<IconButton variant='contained' onClick={handleOpenMCrM} color='primary'>
						<AddIcon></AddIcon>
					</IconButton>
				</div>
				<table>
					<thead>
						<tr>
							<td>Mã ngành</td>
							<td>Tên ngành</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					{majorList.map((major) => (
						<tbody key={major.id}>
							<tr>
								<td>{major.code}</td>
								<td>{major.majorName}</td>
								<td>
									<IconButton onClick={handleOpenSChM} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
									<IconButton onClick={() => handleMajorDelete(major)} color='primary'>
										<DeleteIcon></DeleteIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
			<ChangeMajor setMajorList={setMajorList} open={isOpenMajorChangeModal} onClose={handleCloseMChM} />
			<CreateMajor setMajorList={setMajorList} open={isOpenMajorCreateModal} onClose={handleCloseMCrM} />
			<CreateSemester
				setSemesterList={setSemesterList}
				open={isOpenSemesterCreateModal}
				onClose={handleCloseSCrM}
			/>
		</div>
	);
}
