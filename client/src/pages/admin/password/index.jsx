import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import * as Yup from 'yup';
import userService from '../../../services/user.service';
import style from '../../css/style.module.css';

const validationSchemaChange = Yup.object().shape({
	oldPassword: Yup.string().required('Mật khẩu cũ không được để trống'),
	newPassword: Yup.string().required('Mật khẩu mới không được để trống'),
});
const validationSchemaCreate = Yup.object().shape({
	password: Yup.string().required('Mật khẩu không được để trống'),
	confirmPassword: Yup.string()
		.required('Xác nhận mật khẩu không được để trống')
		.oneOf([Yup.ref('password'), ''], 'Mật khẩu không khớp'),
});

export default function Password() {
	const MySwal = withReactContent(Swal);

	const user = useSelector((state) => state.user);

	const handlePasswordChange = async (values) => {
		try {
			console.log(values);
			const res = await userService.changePassword(values.oldPassword, values.newPassword);
			if (res.status === 'success') {
				MySwal.fire({
					icon: 'success',
					title: 'Đặt mật khẩu thành công',
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				MySwal.fire({
					icon: 'error',
					title: 'Mật khẩu cũ không đúng',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handlePasswordCreate = async (values) => {
		try {
			if (values.password !== values.confirmPassword) {
				MySwal.fire({
					icon: 'error',
					title: 'Mật khẩu không khớp',
					showConfirmButton: false,
					timer: 1500,
				});
				return;
			}
			await userService.createPassword(values.password);
			MySwal.fire({
				icon: 'success',
				title: 'Đặt mật khẩu thành công',
				showConfirmButton: false,
				timer: 1500,
			});
		} catch (error) {
			console.log(error);
		}
	};

	if (!user) return null;

	return (
		<div className={style.details}>
			{user.isSetPassword ? (
				<>
					<div className={style.recentOrders}>
						<div className={style.cardHeader}>
							<h2>Đổi mật khẩu</h2>
						</div>
						<Formik
							initialValues={{
								oldPassword: '',
								newPassword: '',
							}}
							onSubmit={handlePasswordChange}
							validationSchema={validationSchemaChange}
						>
							{({ values, handleChange, handleSubmit }) => {
								return (
									<form onSubmit={handleSubmit}>
										<div className={style.row50}>
											<div className={style.input__box}>
												<span>Mật khẩu cũ</span>
												<input
													className={style.input__box_input}
													type='password'
													autoComplete='off'
													onChange={handleChange}
													value={values.oldPassword}
													required
													name='oldPassword'
												></input>
											</div>
										</div>
										<div className={style.row50}>
											<div className={style.input__box}>
												<span>Mật khẩu mới</span>
												<input
													className={style.input__box_input}
													type='password'
													autoComplete='off'
													required
													onChange={handleChange}
													value={values.newPassword}
													name='newPassword'
												></input>
											</div>
										</div>

										<div className={style.row50}>
											<div className={style.input__box}>
												<input
													className={style.input__box_input}
													type='submit'
													value='Cập nhật'
													onClick={handleSubmit}
												></input>
											</div>
										</div>
									</form>
								);
							}}
						</Formik>
					</div>
				</>
			) : (
				<>
					<div className={style.recentOrders}>
						<div className={style.cardHeader}>
							<h2>Tạo mật khẩu</h2>
						</div>
						<Formik
							initialValues={{
								password: '',
								confirmPassword: '',
							}}
							onSubmit={handlePasswordCreate}
							validationSchema={validationSchemaCreate}
						>
							{({ values, handleChange, handleSubmit }) => {
								return (
									<form onSubmit={handleSubmit}>
										<div className={style.row50}>
											<div className={style.input__box}>
												<span>Mật khẩu</span>
												<input
													className={style.input__box_input}
													name='password'
													type='password'
													onChange={handleChange}
													value={values.password}
												></input>
											</div>
										</div>
										<div className={style.row50}>
											<div className={style.input__box}>
												<span>Xác nhận mật khẩu</span>
												<input
													className={style.input__box_input}
													name='confirmPassword'
													onChange={handleChange}
													type='password'
													value={values.confirmPassword}
												></input>
											</div>
										</div>

										<div className={style.row50}>
											<div className={style.input__box}>
												<input
													className={style.input__box_input}
													type='submit'
													value='Tạo mật khẩu'
													onClick={handleSubmit}
												></input>
											</div>
										</div>
									</form>
								);
							}}
						</Formik>
					</div>
				</>
			)}
		</div>
	);
}
