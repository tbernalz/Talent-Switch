import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/LoginValidation';
import axios from 'axios';
import './../../styles/Login.css'; // ACA CAMBIAR NOMBRE A LOGIN

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
            axios.post('http://localhost:8081/login', values, { withCredentials: true })
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
        <section>
            <div className='text'>Talent Switch</div>

            <form action='' onSubmit={handleSubmit}>
                <h2>Ingreso</h2>
                <div className='login-email'>
                    <ion-icon name='mail-outline'></ion-icon>
                    <label htmlFor='email'><strong>Correo</strong></label>
                    <input type="email" placeholder='Ingresa tu correo' name='email'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.email ? ' is-invalid' : '')}/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className='login-pass'>
                    <ion-icon name= 'locked-closed-outline'></ion-icon>
                    <label htmlFor='password'><strong>Contraseña</strong></label>
                    <input type="password" placeholder='Ingresa tu contraseña' name='password'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.password ? ' is-invalid' : '')}/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <div>
                    <button type='submit' className='button1'>Ingresar</button>
                </div>
                <div>
                    <hr />
                    <p>No tengo una cuenta</p>
                    <div>
                        <Link to="/signup" className='button1'>Crear cuenta</Link>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default Login;