import React, {useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as Yup from 'yup';
import './login.css'
import Register from './register';

const validationSchema = Yup.object().shape({
	username: Yup.string().required('Username is required'),
	password: Yup.string().required('Password is required'),
});

export default function Login() {
    const MySwal = withReactContent(Swal)

    const [values, setValues] = useState({
        username: '',
        password: ''
    })
    const handleSubmit = (event) => {
        (res => {
            if(res.data.Status === 'Success'){
                MySwal.fire({
                    title: <strong>Thông báo!</strong>,
                    html: <i>Đăng nhập thành công!</i>,
                    icon: 'error'
                })
            }
            else{
                MySwal.fire({
                    title: <strong>Lỗi!</strong>,
                    html: <i>Tài khoản của bạn không tồn tại!</i>,
                    icon: 'error'
                })
            }
        })
        .catch(err => console.log(err));
    }

   
    return(
        <div className="login-box">
            <h2>Trang đăng nhập</h2>
            <div className="form-container">
                <form onSubmit= {handleSubmit} validationSchema={validationSchema}>
                    <div className="user-box">
                        <input type="text" name="username" autoComplete="off" required
                        onChange={e => setValues({...values, username: e.target.value})}/>
                        <label htmlFor = "username">
                            <span>Tài khoản</span>
                        </label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="password" autoComplete="off" required
                        onChange={e => setValues({...values, password: e.target.value})}/>
                        <label htmlFor ="password">
                            <span>Mật khẩu</span>
                        </label>
                    </div>
                    <button type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        Đăng nhập   
                    </button>
                    
                </form>
            </div>
            <Register></Register>
        </div>
    )
}
