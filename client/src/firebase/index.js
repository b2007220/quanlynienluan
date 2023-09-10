import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyC2OasBHP8tuvW_POGLawoMsjPrm4KgwWU',
	authDomain: 'quanlynienluan.firebaseapp.com',
	projectId: 'quanlynienluan',
	storageBucket: 'quanlynienluan.appspot.com',
	messagingSenderId: '894988831205',
	appId: '1:894988831205:web:d78863ef4325f528e8070c',
	measurementId: 'G-6EWWRFNXVF',
};

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

export const auth = getAuth(app);
