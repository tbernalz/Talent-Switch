import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../../utils/validations/SignupValidation';
import axios from 'axios';
import './../../styles/Login.css'; // css

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: '',
        password: ''
    })

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
            axios.post('http://localhost:8081/signup', values)
                .then(res => {
                    if (res.data === "Success") {
                        alert('Usuario Registrado Exitosamente');
                        navigate('/');
                    } else if (res.data === "email_exists") {
                        alert("Este Correo ya se Encuentra en Uso por otro Usuario");
                    } else {
                        alert("Ha Ocurrido un Problema");
                    }
                })
                .catch(err => console.log(err));
        }
    };

  return (
    <section className="container mt-5 mb-3 text-white">
        <div className='text-center'>Talent Switch</div>
        <form  action='' onSubmit={handleSubmit}>
            <h2 className="text-center">Registro</h2>
            <div className="row">
                    <div className="col-md-6 offset-md-3">

                <div className='form-group'>
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type="text" placeholder='Ingresa tu nombre' name='name'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.name ? ' is-invalid' : '')}/>
                    {errors.name && <div className='invalid-feedback'> {errors.name}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='email'><strong>Correo</strong></label>
                    <input type="email" placeholder='Ingresa tu correo' name='email'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.email ? ' is-invalid' : '')}/>
                    {errors.email && <div className='invalid-feedback'> {errors.email}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='actual_area'><strong>Area actual</strong></label>
                    <input type="text" placeholder='Ingresa tu area de trabajo' name='actual_area'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.actual_area ? ' is-invalid' : '')}/>
                    {errors.actual_area && <div className='invalid-feedback'> {errors.actual_area}</div>}
                </div>

                {/* campos que pueden ser por agregación de items : Posibles Mejoras*/}

                <div className='form-group'>
                    <label htmlFor='interest_areas'><strong>Areas de interes</strong></label>
                    <input type="text" placeholder='Ingresa tus areas de interes' name='interest_area'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.interest_area ? ' is-invalid' : '')}/>
                    {errors.interest_area && <div className='invalid-feedback'> {errors.interest_area}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='skills'><strong>Habilidades</strong></label>
                    <input type="text" placeholder='Ingresa tus habilidades' name='skills'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.skills ? ' is-invalid' : '')}/>
                    {errors.skills && <div className='invalid-feedback'> {errors.skills}</div>}
                </div>

                {/* ---------------------------------------------- */}

                <div className='form-group'>
                    <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                    <select id="user_type" name='user_type'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.description ? ' is-invalid' : '')}>
                        <option value="" disabled selected>Escoge tu tipo de usuario</option>
                        <option value="leader">Lider</option>
                        <option value="employee">Empleado</option>
                    </select>
                    {errors.user_type && <div className='invalid-feedback'> {errors.user_type}</div>}
                </div>

                <div className='form-group'>
                    <ion-icon name= 'locked-closed-outline'></ion-icon>
                    <label htmlFor='password'><strong>Contraseña</strong></label>
                    <input type="password" placeholder='Ingresa tu contraseña' name='password'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.password ? ' is-invalid' : '')}/>
                    {errors.password && <div className='invalid-feedback'> {errors.password}</div>}
                </div>
                <div className='Password-criteria'>
                    <p>*La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.</p>
                </div>

                <div className='form-group text-center'>
                    <button type='submit' className='btn btn-primary btn-block rounded-0'> Registrarse</button>
                </div>
                <hr/>
                <div className='text-center'>
                    <p>Al darle registrar aceptas nuestros términos y condiciones.</p>
                    <Link to="/" className='btn btn-secondary btn-block rounded-0'>Ingreso</Link>
                </div>

                </div>
                </div>
            </form>
    </section>
  )
}

export default Signup