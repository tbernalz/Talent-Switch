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
    const [errors, setErrors] = useState({})

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
                        alert('User was Successfully registered');
                        navigate('/');
                    } else if (res.data === "email_exists") {
                        alert("Email Already Exists");
                    } else {
                        alert("An Error has Occurred");
                    }
                })
                .catch(err => console.log(err));
        }
    };

  return (
    <section>
        <div className='text'>Talent Switch</div>
        <form  action='' onSubmit={handleSubmit}>
            <h2>Registro</h2>

                <div className='Signup-Name'>
                    {/* <ion-icon name=''></ion-icon> */}
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type="text" placeholder='Ingresa tu nombre' name='name'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.name ? ' is-invalid' : '')}/>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>

                <div className='Signup-Email'>
                    {/* <ion-icon name=''></ion-icon> */}
                    <label htmlFor='email'><strong>Correo</strong></label>
                    <input type="email" placeholder='Ingresa tu correo' name='email'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.email ? ' is-invalid' : '')}/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className='Signup-actualArea'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='actual_area'><strong>Area actual</strong></label>
                    <input type="text" placeholder='Ingresa tu area de trabajo' name='actual_area'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.actual_area ? ' is-invalid' : '')}/>
                    {errors.actual_area && <span className='text-danger'> {errors.actual_area}</span>}
                </div>

                {/* campos que pueden ser por agregación de items : Posibles Mejoras*/}

                <div className='Signup-interestArea'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='interest_areas'><strong>Areas de interes</strong></label>
                    <input type="text" placeholder='Ingresa tus areas de interes' name='interest_area'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.interest_area ? ' is-invalid' : '')}/>
                    {errors.interest_area && <span className='text-danger'> {errors.interest_area}</span>}
                </div>

                <div className='Signup-Skills'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='skills'><strong>Habilidades</strong></label>
                    <input type="text" placeholder='Ingresa tus habilidades' name='skills'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.skills ? ' is-invalid' : '')}/>
                    {errors.skills && <span className='text-danger'> {errors.skills}</span>}
                </div>

                {/* ---------------------------------------------- */}

                <div className='Signup-usuario'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                    <select id="user_type" name='user_type'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.description ? ' is-invalid' : '')}>
                        <option value="" disabled selected>Escoge tu tipo de usuario</option>
                        <option value="leader">Lider</option>
                        <option value="employee">Empleado</option>
                    </select>
                    {errors.user_type && <span className='text-danger'> {errors.user_type}</span>}
                </div>

                <div className='Signup-Pass'>
                    <ion-icon name= 'locked-closed-outline'></ion-icon>
                    <label htmlFor='password'><strong>Contraseña</strong></label>
                    <input type="password" placeholder='Ingresa tu contraseña' name='password'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.password ? ' is-invalid' : '')}/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <div className='Password-criteria'>
                    <p>La contraseña debe contener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.</p>
                </div>
                <div>
                    <button type='submit' className='button1'> Registrarse</button>
                </div>
                <div>
                    <p>Al darle registrar aceptas nuestros terminos y condiciones.</p>
                    <div>
                    <Link to="/"  className='button1'>Ingreso</Link>
                    </div>
                </div>
                
            </form>
    </section>
  )
}

export default Signup