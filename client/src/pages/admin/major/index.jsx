import { IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import authService from '../../../services/auth.service';
import style from '../../css/style.module.css';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import majorService from '../../../services/major.service';
import ChangeMajor from './changemajor';

const validationSchema = Yup.object().shape({
	code: Yup.string().required('MajorCode is required'),
	majorName: Yup.string().required('MajorName is required'),
});

export default function Major() {
	const MySwal = withReactContent(Swal);

	const [majorList, setMajorList] = useState([]);

	const [isOpenMajorChangeModal, setIsOpenMajorChangeModal] = useState(false);

	const handleOpenMChM = () => setIsOpenMajorChangeModal(true);
	const handleCloseMChM = () => setIsOpenMajorChangeModal(false);

	useEffect(() => {
		authService
			.getUserProfile()
			.then(() => {
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
	const handleMajorCreate = async (values) => {
		try {
			const res = await majorService.createMajor(values);
			const newMajorList = [...majorList, res];
			setMajorList(newMajorList);

			MySwal.fire({
				icon: 'success',
				title: 'Thêm thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Ngành học</h2>
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
									<IconButton onClick={handleOpenMChM} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
									<ChangeMajor
										id={major.id}
										setMajorList={setMajorList}
										open={isOpenMajorChangeModal}
										onClose={handleCloseMChM}
									/>
									<IconButton onClick={() => handleMajorDelete(major)} color='primary'>
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
					<h2>Thêm ngành học</h2>
				</div>
				<Formik
					initialValues={{
						code: '',
						majorName: '',
					}}
					onSubmit={handleMajorCreate}
					validationSchema={validationSchema}
				>
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Mã ngành</span>
										<input
											type='input'
											onChange={handleChange}
											value={values.code}
											error={!!errors.code}
											name='code'
										></input>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Mã ngành</span>
										<input
											type='input'
											name='majorName'
											onChange={handleChange}
											value={values.majorName}
											error={!!errors.majorName}
										></input>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input type='submit' value='Tạo ngành học' onClick={handleSubmit}></input>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
		</div>
	);
}
