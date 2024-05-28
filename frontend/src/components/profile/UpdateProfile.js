import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/UpdateValidation';
import axios from 'axios';
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
                        console.error("Error fetching user data:", error);
                        navigate('/');
                    });
            })
            .catch(error => {
                console.error("Error fetching session data:", error);
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
        <section>
            <div className='text'>Talent Switch</div>
            <form onSubmit={handleSubmit}>
                <h2>Actualizar información</h2>

                <div className='Update-Name'>
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type="text" name='name'
                        value={userData.name} onChange={handleInput}
                        className={`form-control rounded-0${errors.name ? ' is-invalid' : ''}`} />
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>

                <div className='Update-Email'>
                    <label htmlFor='email'><strong>Correo</strong></label>
                    <input type="email" name='email' readOnly
                        value={userData.email}
                        className={`form-control rounded-0${errors.email ? ' is-invalid' : ''}`} />
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>

                <div className='Update-ActualArea'>
                    <label htmlFor='actual_area'><strong>Área actual</strong></label>
                    <input type="text" name='actual_area'
                        value={userData.actual_area} onChange={handleInput}
                        className={`form-control rounded-0${errors.actual_area ? ' is-invalid' : ''}`} />
                    {errors.actual_area && <span className='text-danger'>{errors.actual_area}</span>}
                </div>

                <div className='Update-InterestArea'>
                    <label htmlFor='interest_area'><strong>Áreas de interés</strong></label>
                    <input type="text" name='interest_area'
                        value={userData.interest_area} onChange={handleInput}
                        className={`form-control rounded-0${errors.interest_area ? ' is-invalid' : ''}`} />
                    {errors.interest_area && <span className='text-danger'>{errors.interest_area}</span>}
                </div>

                <div className='Update-Skills'>
                    <label htmlFor='skills'><strong>Habilidades</strong></label>
                    <input type="text" name='skills'
                        value={userData.skills} onChange={handleInput}
                        className={`form-control rounded-0${errors.skills ? ' is-invalid' : ''}`} />
                    {errors.skills && <span className='text-danger'>{errors.skills}</span>}
                </div>

                <div className='Update-UserType'>
                    <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                    <input type="text" name='user_type' readOnly
                        value={userData.user_type} className='form-control rounded-0' />
                </div>

                <div>
                    <hr />
                    <button type='submit' className='buttonP'>Guardar</button>
                </div>
                <div>
                    <Link to="/my-profile" className='buttonP1'>Atrás</Link>
                </div>

                <div className='text'>Talent Switch</div>
            </form>
        </section>
    );
}

export default UpdateProfile;