import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import style from '../css/style.module.css';
import userService from '../../services/user.service';
import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';
export default function Student_Home() {
	const [userList, setUserList] = useState([]);
	useEffect(() => {
		authService
			.getUserProfile()
			.then(() => {
				userService.getAllUsers().then((res) => {
					setUserList(res);
					console.log(res);
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const handleActive = async (user) => {
		try {
			const id = user.id;
			userService.activeUser(id);
		} catch (error) {
			console.log(error);
		}
	};
	const handleUnActive = async (user) => {
		try {
			const id = user.id;
			userService.unActiveUser(id);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className={style.detail}>
			<div className={style.recentOrders}>
				<div className={style.cardHeader}>
					<h2>Bảng tài khoản</h2>
				</div>
				<table>
					<thead>
						<tr>
							<td>Họ và tên</td>
							<td>Tài khoản</td>
							<td>Giới tính</td>
							<td>Ngày tạo</td>
							<td>Ngày cập nhật</td>
							<td>Vai trò</td>
							<td>Chuyên ngành</td>
							<td>Trạng thái</td>
							<td>Quản lý</td>
						</tr>
					</thead>
					{userList.map((user) => (
						<tbody key={user.id}>
							<tr>
								<td>{user.fullName}</td>
								<td>{user.email}</td>
								<td>{user.gender}</td>
								<td>{user.createdAt}</td>
								<td>{user.updatedAt}</td>
								<td>{user.role}</td>
								<td>{user.major.majorName}</td>
								<td>{user.active}</td>
								<td>
									<IconButton onClick={handleActive(user)} color='primary'>
										<OpenInNewIcon></OpenInNewIcon>
									</IconButton>
									<IconButton onClick={handleUnActive(user)} color='primary'>
										<OpenInNewOffIcon></OpenInNewOffIcon>
									</IconButton>
								</td>
							</tr>
						</tbody>
					))}
				</table>
			</div>
		</div>
	);
}
