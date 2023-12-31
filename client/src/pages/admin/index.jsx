import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import OpenInNewOffIcon from '@mui/icons-material/OpenInNewOff';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import { IconButton, Pagination } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import userService from '../../services/user.service';
import style from '../css/style.module.css';
import dayjs from 'dayjs';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
export default function Admin_Home() {
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
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});
			await swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn kích hoạt lại tài khoản này?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						const updatedUser = await userService.activeUser(user.id);
						setUserList((prev) => {
							return {
								...prev,
								data: prev.data.map((e) => {
									if (e.id === updatedUser.id) return updatedUser;
									return e;
								}),
							};
						});
						swalWithBootstrapButtons.fire('Thành công!', 'Tài khoản đã được kích hoạt.', 'success');
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						swalWithBootstrapButtons.fire('Hủy bỏ', 'Tài khoản không thay đổi.', 'error');
					}
				});
		} catch (error) {
			console.log(error);
		}
	};

	const handleUnActive = async (user) => {
		try {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});
			await swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn vô hiệu hóa tài khoản này?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						const updatedUser = await userService.unActiveUser(user.id);
						setUserList((prev) => {
							return {
								...prev,
								data: prev.data.map((e) => {
									if (e.id === updatedUser.id) return updatedUser;
									return e;
								}),
							};
						});
						swalWithBootstrapButtons.fire('Thành công!', 'Tài khoản đã bị vô hiệu hóa.', 'success');
					} else if (result.dismiss === Swal.DismissReason.cancel) {
						swalWithBootstrapButtons.fire('Hủy bỏ', 'Tài khoản không thay đổi.', 'error');
					}
				});
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

			await swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn đổi tài khoản này thành giảng viên?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						const updatedUser = await userService.changeTeacher(user.id);
						setUserList((prev) => {
							return {
								...prev,
								data: prev.data.map((e) => {
									if (e.id === updatedUser.id) return updatedUser;
									return e;
								}),
							};
						});
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
	const handleChangeAdmin = async (user) => {
		try {
			const swalWithBootstrapButtons = Swal.mixin({
				customClass: {
					confirmButton: 'btn btn-success',
					cancelButton: 'btn btn-danger',
				},
				buttonsStyling: true,
			});

			await swalWithBootstrapButtons
				.fire({
					title: 'Bạn có muốn đổi tài khoản này thành quản trị viên?',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Có!',
					cancelButtonText: 'Không!',
					reverseButtons: true,
				})
				.then(async (result) => {
					if (result.isConfirmed) {
						const updatedUser = await userService.changeAdmin(user.id);
						setUserList((prev) => {
							return {
								...prev,
								data: prev.data.map((e) => {
									if (e.id === updatedUser.id) return updatedUser;
									return e;
								}),
							};
						});
						swalWithBootstrapButtons.fire(
							'Thành công!',
							'Tài khoản đã chuyển đổi thành quản trị viên.',
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
				.then(async (result) => {
					if (result.isConfirmed) {
						const updatedUser = await userService.changeStudent(user.id);
						setUserList((prev) => {
							return {
								...prev,
								data: prev.data.map((e) => {
									if (e.id === updatedUser.id) return updatedUser;
									return e;
								}),
							};
						});
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
	const handleDeleteAccount = async (user) => {
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
						userService.deleteUserById(user.id);
						setUserList((prev) => {
							return { ...prev, data: prev.data.filter((e) => e.id !== user.id) };
						});
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
								<td>{dayjs(user.createdAt).format('HH:mm DD-MM-YYYY')}</td>
								<td>{dayjs(user.updatedAt).format('HH:mm DD-MM-YYYY')}</td>
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
									<IconButton onClick={() => handleChangeAdmin(user)} color='primary'>
										<AdminPanelSettingsIcon></AdminPanelSettingsIcon>
									</IconButton>
									<IconButton onClick={() => handleDeleteAccount(user)} color='primary'>
										<DeleteIcon></DeleteIcon>
									</IconButton>
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
					sx={{
						marginTop: '10px',
					}}
				/>
			</div>
		</div>
	);
}
