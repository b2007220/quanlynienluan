import { useEffect, useState } from 'react';
import semesterService from '../../../services/semester.service';
import authService from '../../../services/auth.service';
import style from '../../css/style.module.css';
import {
	IconButton,
	Dialog,
	DialogContent,
	DialogTitle,
	TextField,
	FormControl,
	Stack,
	MenuItem,
	InputLabel,
	Select,
	FormHelperText,
	DialogActions,
	Button,
} from '@mui/material';
import { Formik } from 'formik';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';
import SchoolIcon from '@mui/icons-material/School';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import WorkIcon from '@mui/icons-material/Work';
import AddIcon from '@mui/icons-material/Add';

import yearService from '../../../services/year.service';
import majorService from '../../../services/major.service';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import ChangeMajor from './changemajor';
import ChangeSemeter from './changesemester';
import CreateSemester from './createsemester';
import CreateMajor from './createmajor';

export default function MajorSemeter() {
	const MySwal = withReactContent(Swal);
	const [semesterList, setSemesterList] = useState([]);
	const [majorList, setMajorList] = useState([]);
	const [isOpenSemesterCreateModal, setIsOpenSemesterCreateModal] = useState(false);
	const [isOpenMajorCreateModal, setIsOpenMajorCreateModal] = useState(false);
	const [isOpenSemesterChangeModal, setIsOpenSemesterChangeModal] = useState(false);
	const [isOpenMajorChangeModal, setIsOpenMajorChangeModal] = useState(false);

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

	const handleSemeterCreate = async (values) => {
		try {
			const newYear = await yearService.createYear(values.year);
			const newSemester = await semesterService.createSemester(values);

			setSemesterList([...semesterList, newSemester]);

			setIsOpenSemesterCreateModal(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleSemeterChange = async (values) => {
		try {
			const newSemester = await semesterService.updateSemesterById(values);

			setSemesterList([...semesterList, newSemester]);

			setIsOpenSemesterCreateModal(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleMajorChange = async (major) => {
		try {
			const updatedMajor = await majorService.updateMajorById(major.id, major);
			const majorIndex = majorList.findIndex((m) => m.id === major.id);
			if (majorIndex !== -1) {
				const updatedMajorList = [...majorList];
				updatedMajorList[majorIndex] = { ...major, name: updatedMajor.name };
				setMajorList(updatedMajorList);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleMajorDelete = async (major) => {
		try {
			const res = await majorService.deleteMajorById(major.id);
			if (res.status === 200) {
				const newMajorList = majorList.filter((m) => m.id !== major.id);
				setMajorList(newMajorList);
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
					<CreateSemester open={isOpenSemesterCreateModal} handleClose={handleCloseSCrM} />
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
					<CreateMajor open={isOpenMajorCreateModal} handleClose={handleCloseMCrM} />
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
									<ChangeMajor open={isOpenMajorChangeModal} handleClose={handleCloseMChM} />
									<IconButton onClick={() => handleMajorDelete(semester)} color='primary'>
										<DeleteIcon></DeleteIcon>
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
