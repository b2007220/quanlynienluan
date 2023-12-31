import { Button, FormControl, MenuItem, Pagination, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as yup from 'yup';
import enrollService from '../../../services/enroll.service';
import topicService from '../../../services/topic.service';
import useService from '../../../services/use.service';
import userService from '../../../services/user.service';
import style from '../../css/style.module.css';
const validationSchemaFind = yup.object({
	teacherId: yup.string().required('Vui lòng chọn giáo viên hướng dẫn'),
	type: yup.string().required().oneOf(['BASIS', 'MASTER']),
});
const validationSchemaCreate = yup.object({
	teacherId: yup.string().required('Vui lòng chọn giáo viên hướng dẫn'),
	name: yup.string().required('Vui lòng nhập tên đề tài'),
	describe: yup.string().required('Vui lòng nhập mô tả đề tài'),
	type: yup.string().required().oneOf(['BASIS', 'MASTER']),
});
export default function Enroll() {
	const MySwal = withReactContent(Swal);
	const [page, setPage] = useState(0);
	const [teacherList, setTeacherList] = useState([]);

	const [useList, setUseList] = useState({
		data: [],
	});
	const user = useSelector((state) => state.user);

	useEffect(() => {
		useService.getAllUsesInSemester().then((res) => {
			setUseList(res);
		});
		userService.getAllTeachers().then((res) => {
			setTeacherList(res);
		});
	}, [page]);
	if (!user) return null;
	const handleFind = (values) => {
		try {
			useService.getUsesFromTeacher(values).then((res) => {
				setUseList(res);
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleCreateNewTopic = async (values) => {
		try {
			const { name, describe, teacherId, type } = values;
			await topicService.createAndUse({ name, describe, type, isChecked: false, teacherId });
			MySwal.fire({
				icon: 'success',
				title: 'Đăng kí đề tài thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Bạn đã có đề tài',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};
	const handleCreateNewEnroll = async (use) => {
		try {
			await enrollService.createEnrollFromUse(use);
			MySwal.fire({
				icon: 'success',
				title: 'Đăng kí đề tài thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			MySwal.fire({
				icon: 'error',
				title: 'Bạn đã có đề tài',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	};

	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Đăng kí đề tài</h2>
				</div>
				<Formik
					initialValues={{
						type: '',
						teacherId: '',
					}}
					validationSchema={validationSchemaFind}
					onSubmit={handleFind}
				>
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Loại đề tài bạn tìm kiếm</span>
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
									<div className={style.input__box}>
										<span>Chọn giáo viên hướng dẫn</span>
										<FormControl fullWidth>
											<Select
												sx={{
													borderRadius: '12px',
													height: '37px',
												}}
												name='teacherId'
												error={!!errors.teacherId}
												value={values.teacherId}
												onChange={handleChange}
											>
												{teacherList.map((user) => (
													<MenuItem key={user.id} value={user.id}>
														{user.fullName}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input
											className={style.input__box_input}
											type='submit'
											value='Tìm kiếm'
											onClick={handleSubmit}
										/>
									</div>
								</div>
							</form>
						);
					}}
				</Formik>
				<div className={style.card__container}>
					{useList.data.map((use) => (
						<Box sx={{ width: 340, margin: 0.3, borderRadius: 12 }} key={use.id}>
							<Card>
								<CardContent sx={{ height: 250 }}>
									<Typography sx={{ height: 150, overflow: 'hidden' }} variant='h6' component='div'>
										{use.topic.name}
									</Typography>
									<Typography
										sx={{ height: 40, overflow: 'hidden' }}
										variant='subtitle1'
										component='div'
									>
										{use.topic.type === 'BASIS' ? 'Niên luận cơ sở' : 'Niên luận ngành'}
									</Typography>
									<Typography
										variant='body2'
										color='text.secondary'
										sx={{
											height: 60,
											overflow: 'hidden',
										}}
									>
										{use.topic.describe}
									</Typography>
								</CardContent>
								<CardActions sx={{
									marginTop: '5px',
								}}>
									<Button size='small' href={use.topic?.link}>
										Thêm thông tin đề tài
									</Button>
									<Button
										sx={{ marginLeft: 'auto' }}
										size='small'
										onClick={() => handleCreateNewEnroll(use)}
									>
										Đăng kí
									</Button>
								</CardActions>
							</Card>
						</Box>
					))}
				</div>
				<Pagination
					sx={{
						marginTop: '10px',
					}}
					count={useList.total}
					page={page + 1}
					onChange={(_, page) => setPage(page - 1)}
					variant='outlined'
					shape='rounded'
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
						teacherId: '',
					}}
					validationSchema={validationSchemaCreate}
					onSubmit={handleCreateNewTopic}
				>
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Loại đề tài bạn tìm kiếm</span>
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
										<span>Chọn giáo viên hướng dẫn</span>
										<FormControl fullWidth>
											<Select
												name='teacherId'
												sx={{
													borderRadius: '12px',
													height: '37px',
												}}
												error={!!errors.teacherId}
												value={values.teacherId}
												onChange={handleChange}
											>
												{teacherList.map((user) => (
													<MenuItem key={user.id} value={user.id}>
														{user.fullName}
													</MenuItem>
												))}
											</Select>
										</FormControl>
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
										<input
											className={style.input__box_input}
											type='submit'
											value='Đăng kí'
											onClick={handleSubmit}
										></input>
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
