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

	const [isOpenYearChangeModal, setIsOpenYearChangeModal] = useState(false);

	const handleOpenYearChangeModal = () => setIsOpenYearChangeModal(true);
	const handleCloseYearChangeModal = () => setIsOpenYearChangeModal(false);

	useEffect(() => {
		yearService.getAllYears(page).then((res) => {
			setYearList(res);
		});
	}, [page]);

	const handleYearDelete = async (year) => {
		try {
			await yearService.deleteYearById(year.id);
			const newYearList = yearList.filter((y) => y.id !== year.id);
			setYearList(newYearList);
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
			const res = await yearService.createYear(values);
			const newYearList = [...yearList, res];
			setYearList(newYearList);
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
									<IconButton onClick={() => handleOpenYearChangeModal()} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
									<ChangeYear
										id={year.id}
										setYearList={setYearList}
										open={isOpenYearChangeModal}
										onClose={handleCloseYearChangeModal}
									/>
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
