import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/PerfilU.css'; // css

function UpdateProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: ''
    });

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

    const handleInput = (event) => {
        setUserData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí se debe hacer una llamada a la base de datos para actualizar la información del usuario
        axios.post('URL_DEL_BACKEND', userData) // Endpoint para actualizar datos del perfil del usuario
            .then(res => {
                // Manejar la respuesta si es necesario
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <section>
            <div className='h2Update'>
                <h2>Actualizar información</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='Name'>
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type="text" name="name" value={userData.name} onChange={handleInput} />
                </div>
                <div className='Email'>
                    <label htmlFor='email'><strong>Correo</strong></label>
                    <input type="email" name="email" value={userData.email} onChange={handleInput} />
                </div>
                <div className='Actual-area'>
                    <label htmlFor='actual_area'><strong>Area actual</strong></label>
                    <input type="text" name="actual_area" value={userData.actual_area} onChange={handleInput} />
                </div>
                <div className='Interest-Area'>
                    <label htmlFor='interest_areas'><strong>Areas de interes</strong></label>
                    <input type="text" name="interest_area" value={userData.interest_area} onChange={handleInput} />
                </div>
                <div className='Skills'>
                    <label htmlFor='skills'><strong>Habilidades</strong></label>
                    <input type="text" name="skills" value={userData.skills} onChange={handleInput} />
                </div>
                <div className='User-Type'>
                <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                <input type="text" value={userData.user_type} readOnly /></div>
                <div>
                    <button type='submit' className='buttonP'>Guardar</button>
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