import { useEffect } from 'react';
import useService from '../../../services/use.service';
import semesterService from '../../../services/semester.service';
import authService from '../../../services/auth.service';
import { useState } from 'react';
import style from '../../css/style.module.css';

export default function Enroll() {
	const [teacherList, setTeacherList] = useState([]);
	const [user, setUser] = useState([]);
	const [useList, setUseList] = useState({
		data: [],
	});
	useEffect(() => {
		const semester = semesterService.getCurrent();
		authService
			.getUserProfile()
			.then((user) => {
				setUser(user);
			})
			.catch((error) => {
				console.log(error);
			});
		useService.getAllUses().then((res) => {
			setUseList(res);
		});
	}, []);
	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Năm học</h2>
				</div>
			</div>
		</div>
	);
}
