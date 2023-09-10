import { useEffect, useState } from 'react';
import userService from '../../services/user.service';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	fullName: Yup.string().required('Fullname is required'),
	email: Yup.string().email('Email is invalid').required('Email is required'),
	gender: Yup.string().required().oneOf(['MALE', 'FEMALE']),
});

export default function UsersPage() {
	const [userList, setUserList] = useState([]);

	const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

	const handleCreateUser = async (values) => {
		try {
			const newUser = await userService.createUser(values);

			setUserList([...userList, newUser]);

			setIsOpenCreateModal(false);
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		userService.getAllUsers().then((res) => {
			setUserList(res);
		});
	}, []);

	return (
		<div>
			<Button
				variant='contained'
				onClick={() => {
					setIsOpenCreateModal(true);
				}}
			>
				Create
			</Button>

			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Id</TableCell>
						<TableCell>Username</TableCell>
						<TableCell>Fullname</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Gender</TableCell>
					</TableRow>
				</TableHead>

				<TableBody>
					{userList.map((user) => (
						<TableRow key={user.id}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.fullName}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.gender}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<Dialog
				open={isOpenCreateModal}
				onClose={() => {
					setIsOpenCreateModal(false);
				}}
			>
				<Formik
					initialValues={{
						username: '',
						fullName: '',
						email: '',
						gender: '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleCreateUser}
				>
					{({ values, errors, setFieldValue, handleChange, handleSubmit }) => (
						<form onSubmit={handleSubmit}>
							<DialogTitle>Create user</DialogTitle>

							<DialogContent>
								<Stack spacing={2}>
									<TextField
										label='Full Name'
										placeholder='Full Name'
										name='fullName'
										error={!!errors.fullName}
										helperText={errors.fullName}
										value={values.fullName}
										onChange={handleChange}
									/>

									<TextField
										label='Username'
										placeholder='Username'
										name='username'
										error={!!errors.username}
										helperText={errors.username}
										value={values.username}
										onChange={handleChange}
									/>

									<TextField
										label='Email'
										placeholder='Email'
										name='email'
										error={!!errors.email}
										helperText={errors.email}
										value={values.email}
										onChange={handleChange}
									/>

									<FormControl error={!!errors.gender}>
										<InputLabel>Gender</InputLabel>
										<Select
											name='gender'
											label='Gender'
											placeholder='Gender'
											value={values.gender}
											error={!!errors.gender}
											onChange={(event) => {
												setFieldValue('gender', event.target.value);
											}}
										>
											<MenuItem value='MALE'>Male</MenuItem>
											<MenuItem value='FEMALE'>Female</MenuItem>
										</Select>
										<FormHelperText>{errors.gender}</FormHelperText>
									</FormControl>
								</Stack>
							</DialogContent>

							<DialogActions>
								<Button onClick={handleSubmit} variant='contained'>
									Create
								</Button>
							</DialogActions>
						</form>
					)}
				</Formik>
			</Dialog>
		</div>
	);
}
