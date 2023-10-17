import { IconButton, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import style from '../../css/style.module.css';

import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Formik } from 'formik';
import * as Yup from 'yup';
import yearService from '../../../services/year.service';
import ChangeYear from './changeyear';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Vui lòng điền tên năm học'),
});

export default function Year() {
	const MySwal = withReactContent(Swal);
	const [page, setPage] = useState(0);
	const [yearList, setYearList] = useState({
		data: [],
	});
	const [editYear, setEditYear] = useState(null);
	const [isOpenYearChangeModal, setIsOpenYearChangeModal] = useState(false);

	useEffect(() => {
		yearService.getAllYears(page).then((res) => {
			setYearList(res);
			console.log(res);
		});
	}, [page]);

	const handleYearDelete = async (year) => {
		try {
			await yearService.deleteYearById(year.id);
			setYearList((prev) => {
				return { ...prev, data: prev.data.filter((e) => e.id !== year.id) };
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
	const handleYearCreate = async (values) => {
		try {
			const newYear = await yearService.createYear(values);
			setYearList((prev) => {
				return {
					...prev,
					data: [...prev.data, newYear],
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
					<h2>Năm học</h2>
				</div>
				<table>
					<thead>
						<tr>
							<td>Tên năm học</td>
							<td>Thao tác</td>
						</tr>
					</thead>
					{yearList.data.map((year) => (
						<tbody key={year.id}>
							<tr>
								<td>{year.name}</td>
								<td>
									<IconButton onClick={() => setEditYear(year)} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>

									<IconButton onClick={() => handleYearDelete(year)} color='primary'>
										<DeleteIcon></DeleteIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
				<Pagination
					count={yearList.total}
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
					<h2>Thêm năm học</h2>
				</div>
				<Formik
					initialValues={{
						name: '',
					}}
					onSubmit={handleYearCreate}
					validationSchema={validationSchema}
				>
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Tên năm học</span>
										<input
											className={style.input__box_input}
											type='input'
											onChange={handleChange}
											value={values.name}
											error={!!errors.name}
											name='name'
										></input>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input 
										className={style.input__box_input}
										type='submit' value='Tạo ngành học' onClick={handleSubmit}></input>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
			<ChangeYear year={editYear} setYearList={setYearList} open={!!editYear} onClose={() => setEditYear(null)} />
		</div>
	);
}
