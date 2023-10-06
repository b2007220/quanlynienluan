import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Pagination } from '@mui/material';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import semesterService from '../../../services/semester.service';
import topicService from '../../../services/topic.service';
import useService from '../../../services/use.service';
import style from '../../css/style.module.css';
import ChangeUse from './changeuse';
const validationSchema = yup.object({
	name: yup.string().required('Vui lòng nhập tên đề tài'),
	describe: yup.string().required('Vui lòng nhập mô tả đề tài'),
	type: yup.string().required().oneOf(['BASIS', 'MASTER']),
	link: yup.string().required('Vui lòng nhập link tham khảo'),
});
export default function Use() {
	const MySwal = withReactContent(Swal);
	const [editUse, setEditUse] = useState(null);
	const [page, setPage] = useState(0);
	const [useList, setUseList] = useState({
		data: [],
	});
	useEffect(() => {
		useService.getUsesFromTeacher(page).then((res) => {
			setUseList(res);
		});
	}, [page]);

	const handleCreateNewUse = async (values) => {
		try {
			const semester = await semesterService.getCurrent();
			const topic = await topicService.createTopic(values);
			const newUse = await useService.createUse({ topicId: topic.id, user, semesterId: semester.id });
			setUseList((prev) => {
				return {
					...prev,
					data: [...prev.data, newUse],
				};
			});
			MySwal.fire({
				icon: 'success',
				title: 'Tạo thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleUseDelete = async (use) => {
		try {
			const swalWithBootstrapButtons = await Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});
			await swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn xóa tài khoản khỏi hệ thống?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						
						await useService.deleteUseById(use.id);

						setUseList((prev) => {
							return {
								...prev,
								data: prev.data.filter((item) => item.id !== use.id),
							};
						});
						swalWithBootstrapButtons.fire(
							'Thành công!',
							'Bạn đã xóa đề tài ra khỏi danh sách sử dụng.',
							'success',
						);
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						swalWithBootstrapButtons.fire('Hủy bỏ', 'Danh sách không thay đổi.', 'error');
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Danh sách đề tài năm nay</h2>
				</div>

				<table>
					<tr>
						<td>Tên đề tài</td>
						<td>Miêu tả đề tài</td>
						<td>Link tham khảo</td>
						<td>Thao tác</td>
					</tr>
					{useList.data.map((use) => (
						<tbody key={use.id}>
							<tr>
								<td>{use.topic.name}</td>
								<td>{use.topic.describe}</td>
								<td>
									<a href={use.topic.link}>{use.topic.link}</a>
								</td>
								<td>
									<IconButton onClick={() => setEditUse(use)} color='primary'>
										<CreateIcon></CreateIcon>
									</IconButton>
									<IconButton onClick={() => handleUseDelete(use)} color='primary'>
										<DeleteIcon></DeleteIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
				<Pagination
					count={useList.total}
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
					<h2>Thêm đề tài mới</h2>
				</div>
				<Formik
					initialValues={{
						name: '',
						describe: '',
						type: '',
						link: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleCreateNewUse}
				>
					{({ values, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Loại đề tài</span>
										<div className={style.radio__group}>
											<label className={style.radio}>
												<input type='radio' name='type' value='BASIS' onChange={handleChange} />
												Niên luận cơ sở
												<span></span>
											</label>
											<label className={style.radio}>
												<input
													type='radio'
													name='type'
													value='MASTER'
													onChange={handleChange}
												/>
												Niên luận ngành
												<span></span>
											</label>
										</div>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Tên đề tài</span>
										<textarea
											name='name'
											rows='3'
											onChange={handleChange}
											value={values.name}
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Miêu tả về đề tài</span>
										<textarea
											name='describe'
											rows='5'
											onChange={handleChange}
											value={values.describe}
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Trang web tham khảo</span>
										<textarea
											name='link'
											rows='5'
											onChange={handleChange}
											value={values.link}
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input type='submit' value='Thêm' onClick={handleSubmit}></input>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
			</div>
			<ChangeUse use={editUse} setUseList={setUseList} open={!!editUse} onClose={() => setEditUse(null)} />
		</div>
	);
}
