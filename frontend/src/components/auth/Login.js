import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/LoginValidation';
import axios from 'axios';
import './../../styles/Login.css'; // Make sure this file is properly imported

const BASE_URL = process.env.REACT_APP_BASE_URL;

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) {
            axios.post(`${BASE_URL}/login`, values, { withCredentials: true })
                .then(res => {
                    if (res.data === "Success") {
                        alert('User was found, Welcome to Magneto Talent Switch');
                        navigate('/home');
                    } else if (res.data === "email_no_exists") {
                        alert("Email not found");
                    } else if (res.data === "error_password") {
                        alert("Incorrect Password");
                    } else {
                        alert("A problem has occurred");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <section className="container mt-5 text-white">
            <div className='text-center'>Talent Switch</div>

            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Ingreso</h2>
                <div className='form-group'>
                    <ion-icon name='mail-outline'></ion-icon>
                    <label htmlFor='email'><strong>Correo</strong></label>
                    <input type="email" placeholder='Ingresa tu correo' name='email'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.email ? ' is-invalid' : '')} />
                    {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                </div>

                <div className='form-group'>
                    <ion-icon name='locked-closed-outline'></ion-icon>
                    <label htmlFor='password'><strong>Contraseña</strong></label>
                    <input type="password" placeholder='Ingresa tu contraseña' name='password'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.password ? ' is-invalid' : '')} />
                    {errors.password && <div className='invalid-feedback'> {errors.password}</div>}
                </div>
                <div className='form-group text-center'>
                    <button type='submit' className='btn btn-primary'>Ingresar</button>
                </div>
                <hr />
                <p className="text-center">No tengo una cuenta</p>
                <div className='form-group text-center'>
                    <Link to="/signup" className='btn btn-primary'>Crear cuenta</Link>
                </div>
            </form>
        </section>
    );
}

export default Login;
