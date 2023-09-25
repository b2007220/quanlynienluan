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

const card = <React.Fragment></React.Fragment>;
export default function Enroll() {
	const [page, setPage] = useState(0);
	const [teacherList, setTeacherList] = useState([]);
	const [user, setUser] = useState([]);
	const [useList, setUseList] = useState({
		data: [],
	});
	useEffect(() => {
		const semester = semesterService.getCurrent();
		useService.getAllUses().then((res) => {
			setUseList(res);
		});
		userService.getAllTeachers().then((res) => {
			setTeacherList(res);
			console.log(res);
		});
	}, []);
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Đăng kí đề tài</h2>
				</div>
				<div className={style.row50}>
					<div className={style.input__box}>
						<span>Học kì này bạn làm niên luận gì</span>
						<div className={style.radio__group}>
							<label className={style.radio}>
								<input type='radio' name='type' />
								Niên luận cơ sở
								<span></span>
							</label>
							<label className={style.radio}>
								<input type='radio' name='type' />
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
				</div>
				<div className={style.card__container}>
					{useList.data.map((use) => (
						<Box sx={{ minWidth: 275, maxWidth: 350 }}>
							<Card variant='outlined' key={use.id}>
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
					<Pagination
						count={useList.total}
						page={page + 1}
						onChange={(_, page) => setPage(page - 1)}
						variant='outlined'
						shape='rounded'
					/>
				</div>
			</div>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Thêm báo cáo mới</h2>
				</div>
				<Formik
					initialValues={{
						doneJob: '',
						nextJob: '',
						promiseAt: '',
						enrollId: '',
					}}
					// validationSchema={validationSchema}
					// onSubmit={handleCreateNewReport}
				>
					{({ values, errors, handleChange, handleSubmit }) => {
						return (
							<form onSubmit={handleSubmit}>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Thời hạn</span>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Công việc đã hoàn thành</span>
										<textarea
											name='doneJob'
											rows='5'
											onChange={handleChange}
											value={values.doneJob}
											error={!!errors.doneJob}
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<span>Công việc sắp tới</span>
										<textarea
											name='nextJob'
											rows='5'
											onChange={handleChange}
											value={values.nextJob}
											error={!!errors.nextJob}
										></textarea>
									</div>
								</div>
								<div className={style.row100}>
									<div className={style.input__box}>
										<input type='submit' value='Cập nhật' onClick={handleSubmit}></input>
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
