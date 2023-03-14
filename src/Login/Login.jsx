import React, { useState,useEffect, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import UserAPI from '../API/UserAPI';
import { useNavigate } from 'react-router-dom'

import './Login.css';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { loading, error, dispatch } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async () => {
		try {
			const response = await UserAPI.login({ email, password })
			if (response.user?.role === 'admin') {
				dispatch({ type: 'LOGIN_SUCCESS', payload: response.user });
				navigate('/')
			} else {
				alert('user ko phai admin')
			}
		} catch (e) {
			alert(e.message)
		}
	};

	return (
		<div className='page-wrapper'>
			<div className='page-breadcrumb'>
				<div className='row'>
					<div class='login'>
						<div class='heading'>
							<h2>Sign in</h2>
							<form action='#'>
								<div className='input-group input-group-lg'>
									<span className='input-group-addon'>
										<i className='fa fa-user'></i>
									</span>
									<input
										type='text'
										className='form-control'
										placeholder='Email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className='input-group input-group-lg'>
									<span className='input-group-addon'>
										<i className='fa fa-lock'></i>
									</span>
									<input
										type='password'
										className='form-control'
										placeholder='Password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</div>

								<button
									type='button'
									className='float'
									onClick={handleSubmit}>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
