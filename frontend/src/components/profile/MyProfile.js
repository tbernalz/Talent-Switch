import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../styles/Perfil.css'; // css
import './../../styles/PerfilU.css'; // css

const BASE_URL = process.env.REACT_APP_BASE_URL;

function MyProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', actual_area: '', interest_area: '', skills: '', user_type: '' });

    useEffect(() => {
        // Verificar la sesión antes de obtener los datos del usuario
        axios.get(`${BASE_URL}/checkSession`, { withCredentials: true })
            .then(response => {
                const userEmail = response.data.email;
                // Realizar una solicitud POST para obtener los datos del usuario de la base de datos
                axios.post(`${BASE_URL}/my-profile`, { email: userEmail })
                    .then(userDataResponse => {
                        setUser(userDataResponse.data); // Establecer los datos del usuario en el estado
                    })
                    .catch(error => {
                        console.error("Error al recuperar los datos del usuario: ", error);
                        navigate('/home');
                    });
            })
            .catch(error => {
                console.error("Error al recuperar los datos de la sesión: ", error);
                navigate('/');
            });
    }, [navigate]);

    return (
        <section className="mt-5 mb-5 text-white">
            <div>
                <h2>Mi perfil</h2>
            </div>

            <div className='form-group'>
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type="text" value={user.name} readOnly
                    name='name' className={`form-control rounded-0`} />
            </div>

            <div className='form-group'>
                <label htmlFor='email'><strong>Correo</strong></label>
                <input type="email" value={user.email} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='form-group'>
                <label htmlFor='actual_area'><strong>Área actual</strong></label>
                <input type="text" value={user.actual_area} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='form-group'>
                <label htmlFor='interest_areas'><strong>Áreas de interés</strong></label>
                <input type="text" value={user.interest_area} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='form-group'>
                <label htmlFor='skills'><strong>Habilidades</strong></label>
                <input type="text" value={user.skills} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='form-group'>
                <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                <input type="text" value={user.user_type} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>
            <br/>
            <div className=" justify-content-between text-center">
                <Link to="/update-profile" className='btn btn-primary'>Actualizar Información</Link>
            </div>
            <div className='text-center'>
                <hr/>
                <Link to="/home" className='btn btn-secondary'>Atrás</Link>
            </div>
            <div className='text'>Talent Switch</div>
        </section>
    );
}

export default MyProfile;