import { IconButton, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
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
	const [editMajor, setEditMajor] = useState(null);
	const MySwal = withReactContent(Swal);
	const [page, setPage] = useState(0);

	const [majorList, setMajorList] = useState({
		data: [],
	});

	useEffect(() => {
		majorService.getAllMajors(page).then((res) => {
			setMajorList(res);
		});
	}, [page]);

	const handleMajorDelete = async (major) => {
		try {
			await majorService.deleteMajorById(major.id);
			setMajorList((prev) => {
				return { ...prev, data: prev.data.filter((e) => e.id !== major.id) };
			});
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
			const newMajor = await majorService.createMajor(values);
			setMajorList((prev) => {
				return {
					...prev,
					data: [...prev.data, newMajor],
				};
			});

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
					{majorList.data.map((major) => (
						<tbody key={major.id}>
							<tr>
								<td>{major.code}</td>
								<td>{major.majorName}</td>
								<td>
									<IconButton onClick={() => setEditMajor(major)} color='primary'>
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
				<Pagination
					count={majorList.total}
					page={page + 1}
					onChange={(_, page) => setPage(page - 1)}
					variant='outlined'
					shape='rounded'
					sx={{
						marginTop: '10px',
					}}
				/>
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
					{({ values, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Mã ngành</span>
										<input
											type='input'
											onChange={handleChange}
											value={values.code}
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
			<ChangeMajor
				major={editMajor}
				setMajorList={setMajorList}
				open={!!editMajor}
				onClose={() => setEditMajor(null)}
			/>
		</div>
	);
}
