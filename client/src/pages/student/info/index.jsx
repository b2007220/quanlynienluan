import style from '../../css/style.module.css';
import { useEffect, useState } from 'react';
import authService from '../../../services/auth.service';
import { Select, MenuItem } from '@mui/material';
import majorService from '../../../services/major.service';
export default function Info() {
	const [info, setInfo] = useState([]);
	const [major, setMajor] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then((user) => {
				setInfo(user);
				majorService.getAllMajors().then((res) => {
					setMajor(res);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className={style.details}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Thông tin cá nhân</h2>
				</div>
				{setInfo.map((info) => (
					<form>
						<div className={style.row50}>
							<div className={style.input__box}>
								<span>Họ tên</span>
								<input
									type='text'
									autoComplete='off'
									required
									value={values.fullName}
									name='fullName'
								></input>
							</div>
							<div className={style.input__box}>
								<span>Ngành học</span>
							</div>
							<Select value={info.major.majorName} name='majorName' displayEmpty>
								{setMajor.map((major) => (
									<MenuItem key={major.id} value={major.code}>
										{major.majorName}
									</MenuItem>
								))}
							</Select>
						</div>
						<div className={style.row50}>
							<div className={style.input__box}>
								<span>Email</span>
								<input type='email' name='email' value={info.email} readonly required></input>
							</div>
							<div className={style.input__box}>
								<span>MSSV</span>
								<input
									type='text'
									name='studentId'
									required
									autoComplete='off'
									value={info.studentId}
								></input>
							</div>
						</div>
						<div className={style.row25}>
							<div className={style.input__box}>
								<span>Khóa</span>
								<input type='number' min='42' name='khoa' value={info} required></input>
							</div>
						</div>
						<div className={style.row25}>
							<div className={style.input__box}>
								<span>Giới tính</span>
							</div>
							<Select value={info.gender} name='gender' displayEmpty>
								<MenuItem value='MALE'>Nam</MenuItem>
								<MenuItem value='FEMALE'>Nữ</MenuItem>
								<MenuItem value='HIDĐEN'>Ẩn</MenuItem>
							</Select>
						</div>
						<div className={style.row100}>
							<div className={style.input__box}>
								<button type='submit' value='Cập nhật' onClick={handleSubmit}></button>
							</div>
						</div>
					</form>
				))}
			</div>
		</div>
	);
}
