import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import style from '../css/style.module.css';
import userService from '../../services/user.service';
import { IconButton } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';
import SchoolIcon from '@mui/icons-material/School';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import WorkIcon from '@mui/icons-material/Work';
import { Pagination } from '@mui/material';

export default function Student_Home() {
	const MySwal = withReactContent(Swal);
	const [userList, setUserList] = useState({
		data: [],
	});
	const [page, setPage] = useState(0);

	useEffect(() => {
		userService.getAllUsers(page).then((res) => {
			setUserList(res);
		});
	}, [page]);

	const handleActive = async (user) => {
		try {
			const updatedUser = await userService.activeUser(user.id);

			const userIndex = userList.findIndex((u) => u.id === user.id);

			if (userIndex !== -1) {
				const updatedUserList = [...userList];
				updatedUserList[userIndex] = { ...user, active: true };
				setUserList(updatedUserList);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleUnActive = async (user) => {
		try {
			const updatedUser = await userService.unactiveUser(user.id);

			const userIndex = userList.findIndex((u) => u.id === user.id);

			if (userIndex !== -1) {
				const updatedUserList = [...userList];
				updatedUserList[userIndex] = { ...user, active: false };
				setUserList(updatedUserList);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangeTeacher = async (user) => {
		try {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});

			swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn đổi tài khoản này thành giảng viên?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then((result) => {
					if (result.isConfirmed) {
						const updatedUser = userService.changeTeacher(user.id);
						console.log(updatedUser);
						const userIndex = userList.findIndex((u) => u.id === user.id);

						if (userIndex !== -1) {
							const updatedUserList = [...userList];
							updatedUserList[userIndex] = { ...user, role: 'TEACHER' };
							setUserList(updatedUserList);
						}
						swalWithBootstrapButtons.fire(
							'Thành công!',
							'Tài khoản đã chuyển đổi thành giáo viên.',
							'success',
						);
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						swalWithBootstrapButtons.fire('Hủy bỏ', 'Tài khoản không thay đổi.', 'error');
					}
				});
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangeStudent = async (user) => {
		try {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});

			swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn đổi tài khoản này thành sinh viên?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then((result) => {
					if (result.isConfirmed) {
						const updatedUser = userService.changeStudent(user.id);

						const userIndex = userList.findIndex((u) => u.id === user.id);

						if (userIndex !== -1) {
							const updatedUserList = [...userList];
							updatedUserList[userIndex] = { ...user, role: 'STUDENT' };
							setUserList(updatedUserList);
						}
						swalWithBootstrapButtons.fire(
							'Thành công!',
							'Tài khoản đã chuyển đổi thành sinh viên.',
							'success',
						);
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						swalWithBootstrapButtons.fire('Hủy bỏ', 'Tài khoản không thay đổi.', 'error');
					}
				});
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
							<td>Trạng thái</td>
							<td>Quản lý</td>
						</tr>
					</thead>
					{userList.data.map((user) => (
						<tbody key={user.id}>
							<tr>
								<td>{user.fullName}</td>
								<td>{user.email}</td>
								<td>{user.gender}</td>
								<td>{user.createdAt}</td>
								<td>{user.updatedAt}</td>
								<td>{user.role}</td>
								<td>{user.active ? 'Hoạt động' : 'Vô hiệu'}</td>
								<td>
									<IconButton onClick={() => handleActive(user)} color='primary'>
										<OpenInNewIcon></OpenInNewIcon>
									</IconButton>
									<IconButton onClick={() => handleUnActive(user)} color='primary'>
										<OpenInNewOffIcon></OpenInNewOffIcon>
									</IconButton>
									{user.role === 'STUDENT' && (
										<IconButton onClick={() => handleChangeTeacher(user)} color='primary'>
											<WorkIcon></WorkIcon>
										</IconButton>
									)}
									{user.role === 'TEACHER' && (
										<IconButton onClick={() => handleChangeStudent(user)} color='primary'>
											<SchoolIcon></SchoolIcon>
										</IconButton>
									)}
								</td>
							</tr>
						</tbody>
					))}
				</table>
				<Pagination
					count={userList.total}
					page={page + 1}
					onChange={(_, page) => setPage(page - 1)}
					variant='outlined'
					shape='rounded'
				/>
			</div>
		</div>
	);
}
