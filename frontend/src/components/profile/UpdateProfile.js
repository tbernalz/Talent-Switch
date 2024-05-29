import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/UpdateValidation';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../styles/PerfilU.css'; // css

function UpdateProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/checkSession', { withCredentials: true })
            .then(response => {
                const userEmail = response.data.email;
                axios.post('http://localhost:8081/my-profile', { email: userEmail })
                    .then(userDataResponse => {
                        const { name, email, actual_area, interest_area, skills, user_type } = userDataResponse.data;
                        setUserData({
                            name: name || '',
                            email: email || '',
                            actual_area: actual_area || '',
                            interest_area: interest_area || '',
                            skills: skills || '',
                            user_type: user_type || '',
                        });
                    })
                    .catch(error => {
                        console.error("Error al recuperar los datos del usuario: ", error);
                        navigate('/');
                    });
            })
            .catch(error => {
                console.error("Error al recuperar los datos de la sesión: ", error);
                navigate('/');
            });
    }, [navigate]);

    const handleInput = (event) => {
        setUserData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const validationErrors = Validation(userData);
        setErrors(validationErrors);
    
        if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) {
            const { name, actual_area, interest_area, skills, email } = userData;
            axios.post('http://localhost:8081/update-profile', { name, actual_area, interest_area, skills, email })
                .then(res => {
                    if (res.data === "Success") {
                        alert('Datos Actualizados con Éxito');
                        navigate(`/my-profile`);
                    } else {
                        alert("Ha Ocurrido un Error");
                    }
                })
                .catch(err => {
                    console.error("Error al actualizar los datos:", err);
                    alert("Ha Ocurrido un Error al actualizar los datos");
                });
        } else {
            console.log("Errores de validación:", validationErrors);
        }
    };

    return (
        <section className="container mt-5 mb-5 text-white">
            <div>
                <h2>Actualizar información</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type="text" name='name'
                        value={userData.name} onChange={handleInput}
                        className={`form-control rounded-0${errors.name ? ' is-invalid' : ''}`} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='email'><strong>Correo</strong></label>
                    <input type="email" name='email' readOnly
                        value={userData.email}
                        className={`form-control rounded-0${errors.email ? ' is-invalid' : ''}`} />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='actual_area'><strong>Área actual</strong></label>
                    <input type="text" name='actual_area'
                        value={userData.actual_area} onChange={handleInput}
                        className={`form-control rounded-0${errors.actual_area ? ' is-invalid' : ''}`} />
                    {errors.actual_area && <div className="invalid-feedback">{errors.actual_area}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='interest_area'><strong>Áreas de interés</strong></label>
                    <input type="text" name='interest_area'
                        value={userData.interest_area} onChange={handleInput}
                        className={`form-control rounded-0${errors.interest_area ? ' is-invalid' : ''}`} />
                    {errors.interest_area && <div className="invalid-feedback">{errors.interest_area}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='skills'><strong>Habilidades</strong></label>
                    <input type="text" name='skills'
                        value={userData.skills} onChange={handleInput}
                        className={`form-control rounded-0${errors.skills ? ' is-invalid' : ''}`} />
                    {errors.skills && <div className="invalid-feedback">{errors.skills}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                    <input type="text" name='user_type' readOnly
                        value={userData.user_type} className='form-control rounded-0' />
                </div>
                <br/>
                <div className=" justify-content-between text-center">
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                </div>
                <div className='text-center'>
                    <hr/>
                    <Link to="/my-profile" className="btn btn-secondary">Atrás</Link>
                </div>

                <div className='text'>Talent Switch</div>
            </form>
        </section>
    );
}

export default UpdateProfile;