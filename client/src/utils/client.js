import axios from 'axios';

const createClient = (baseUrl = '') => {
	const client = axios.create({
		baseURL: `${import.meta.env.VITE_APP_BACKEND_API}/${baseUrl}`,
	});

	client.interceptors.request.use((req) => {
		req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

		return req;
	});

	client.interceptors.response.use(
		(res) => {
			return res.data;
		},
		(error) => {
			throw error.response?.data?.message || error.message;
		},
	);

	return client;
};

export default createClient;
