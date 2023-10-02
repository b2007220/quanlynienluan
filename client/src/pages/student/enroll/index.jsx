import { useEffect } from 'react';
import useService from '../../../services/use.service';
import semesterService from '../../../services/semester.service';
import authService from '../../../services/auth.service';
import { useState } from 'react';
import style from '../../css/style.module.css';
import { Input, MenuItem, FormControl, Select, Button, Pagination } from '@mui/material';
import userService from '../../../services/user.service';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import * as yup from 'yup';
import topicService from '../../../services/topic.service';
import enrollService from '../../../services/enroll.service';
const validationSchema = yup.object({
	name: yup.string().required('Vui lòng nhập tên đề tài'),
	describe: yup.string().required('Vui lòng nhập mô tả đề tài'),
	gender: yup.string().required().oneOf(['BASIS', 'MASTER']),
});
export default function Enroll() {
	const [page, setPage] = useState(0);
	const [teacherList, setTeacherList] = useState([]);
	const [user, setUser] = useState([]);
	const [useList, setUseList] = useState({
		data: [],
	});
	const [enrollInfo, setEnrollInfo] = useState(null);
	useEffect(() => {
		authService.getUserProfile().then((res) => {
			setUser(res);
		});
		useService.getAllUsesInSemester().then((res) => {
			setUseList(res);
		});
		userService.getAllTeachers().then((res) => {
			setTeacherList(res);
			console.log(res);
		});
	}, []);
	const handleCreateNewTopic = (values) => {
		try {
			console.log(emrollInfo);
			const { name, descripbe } = values;
			const semester = semesterService.getCurrent();
			// const topic = topicService.createTopic({ name, describe });
			// const newUse = useService.createUse({ topic, teacher, semester });
			// const newEnroll = enrollService.createEnroll({ user, newUse });
		} catch (error) {
			console.log(error);
		}
	};
	const handleCreateNewEnroll = (use) => {
		try {
			const enroll = enrollService.createEnroll({ user, use });
			console.log(enroll);
		} catch (error) {
			console.log(error);
		}
	};
	const handleFind = (values) => {
		try {
			const info = setEnrollInfo(values);
			console.log(info);
			// const uses = useService.getUsesFromTeacher(info);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Đăng kí đề tài</h2>
				</div>
				<div className={style.row50}>
					<div className={style.input__box}>
						<span>Loại đề tài bạn tìm kiếm</span>
						<div className={style.radio__group}>
							<label className={style.radio}>
								<input type='radio' name='type' value='BASIS' />
								Niên luận cơ sở
								<span></span>
							</label>
							<label className={style.radio}>
								<input type='radio' name='type' value='MASTER' />
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
							>
								{teacherList.map((user) => (
									<MenuItem key={user.id} value={user.id}>
										{user.fullName}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</div>
					<div className={style.input__box}>
						<span>Loại đề tài bạn tìm kiếm</span>
						<div className={style.input__box}>
							<input type='submit' value='Tìm kiếm' onClick={handleFind} />
						</div>
					</div>
				</div>
				<div className={style.card__container}>
					{useList.data.map((use) => (
						<Box sx={{ minWidth: 275, maxWidth: 350 }} key={use.id}>
							<Card variant='outlined'>
								<CardContent>
									<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
										{use.topic.type === 1 ? 'Niên luận cơ sở' : 'Niên luận ngành'}
									</Typography>
									<Typography variant='h5' component='div'>
										{use.topic.name}
									</Typography>
									<Typography sx={{ mb: 1.5 }} color='text.secondary'>
										{use.userId}
									</Typography>
									<Typography variant='body2'>{use.describe}</Typography>
								</CardContent>
								<CardActions>
									<Button size='small' href={use.topic.link}>
										Them thong tin
									</Button>
									<Button size='small'>Dang ki</Button>
								</CardActions>
							</Card>
						</Box>
					))}

					<Box sx={{ minWidth: 275, maxWidth: 350 }}>
						<Card variant='outlined'>
							<CardContent>
								<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
									1
								</Typography>
								<Typography variant='h5' component='div'></Typography>
								<Typography sx={{ mb: 1.5 }} color='text.secondary'></Typography>
								<Typography variant='body2'></Typography>
							</CardContent>
							<CardActions>
								<Button size='small'>Them thong tin</Button>
								<Button size='small'>Dang ki</Button>
							</CardActions>
						</Card>
					</Box>
				</div>
				<Pagination
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
					}}
					validationSchema={validationSchema}
					onSubmit={handleCreateNewTopic}
				>
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Tên đề tài</span>
										<textarea
											name='name'
											rows='3'
											onChange={handleChange}
											value={values.name}
											error={!!errors.name}
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
											error={!!errors.describe}
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input type='submit' value='Đăng kí' onClick={handleSubmit}></input>
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
