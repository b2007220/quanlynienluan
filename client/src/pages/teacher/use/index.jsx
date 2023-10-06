import { Button, Pagination, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import authService from '../../../services/auth.service';
import semesterService from '../../../services/semester.service';
import topicService from '../../../services/topic.service';
import useService from '../../../services/use.service';
import style from '../../css/style.module.css';
import LinkIcon from '@mui/icons-material/Link';
import ChangeUse from './changeuse';
import EditIcon from '@mui/icons-material/Edit';
const validationSchema = yup.object({
	name: yup.string().required('Vui lòng nhập tên đề tài'),
	describe: yup.string().required('Vui lòng nhập mô tả đề tài'),
	type: yup.string().required().oneOf(['BASIS', 'MASTER']),
	link: yup.string().required('Vui lòng nhập link tham khảo'),
});
export default function Use() {
	const [editUse, setEditUse] = useState(null);
	const [page, setPage] = useState(0);
	const [user, setUser] = useState([]);
	const [useList, setUseList] = useState({
		data: [],
	});
	useEffect(() => {
		authService.getUserProfile().then((res) => {
			setUser(res);
		});
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
				<div className={style.card__container}>
					{useList.data.map((use) => (
						<Box sx={{ margin: 0.2 }} key={use.id}>
							<Card variant='outlined' sx={{ width: 350, height: 190, margin: 0.2 }}>
								<CardContent>
									<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
										{use.topic.name}
									</Typography>
									<Typography variant='h5' component='div'>
										{use.describe}
									</Typography>
								</CardContent>
								<CardActions disableSpacing>
									<IconButton size='small' href={use.topic.link}>
										<LinkIcon></LinkIcon>
									</IconButton>
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
		</div>
	);
}
