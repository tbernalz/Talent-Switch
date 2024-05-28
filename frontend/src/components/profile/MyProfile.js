import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Perfil.css'; // css
import './../../styles/PerfilU.css'; // css

function MyProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', email: '', actual_area: '', interest_area: '', skills: '', user_type: '' });

    useEffect(() => {
        // Verificar la sesión antes de obtener los datos del usuario
        axios.get('http://localhost:8081/checkSession', { withCredentials: true })
            .then(response => {
                const userEmail = response.data.email;
                // Realizar una solicitud POST para obtener los datos del usuario de la base de datos
                axios.post('http://localhost:8081/my-profile', { email: userEmail })
                    .then(userDataResponse => {
                        setUser(userDataResponse.data); // Establecer los datos del usuario en el estado
                    })
                    .catch(error => {
                        console.error("Error fetching user data:", error);
                        navigate('/home');
                    });
            })
            .catch(error => {
                console.error("Error fetching session data:", error);
                navigate('/');
            });
    }, [navigate]);

    return (
        <section>
            <h2>Mi perfil</h2>

            <div className='Update-Name'>
                    <label htmlFor='name'><strong>Nombre</strong></label>
                    <input type="text" value={user.name} readOnly
                    name='name' className={`form-control rounded-0`} />
            </div>

            <div className='Update-Email'>
                <label htmlFor='email'><strong>Correo</strong></label>
                <input type="email" value={user.email} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='Update-ActualArea'>
                <label htmlFor='actual_area'><strong>Área actual</strong></label>
                <input type="text" value={user.actual_area} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='Interest-Update-InterestArea'>
                <label htmlFor='interest_areas'><strong>Áreas de interés</strong></label>
                <input type="text" value={user.interest_area} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='Update-Skills'>
                <label htmlFor='skills'><strong>Habilidades</strong></label>
                <input type="text" value={user.skills} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div className='Update-UserType'>
                <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                <input type="text" value={user.user_type} readOnly
                name='name' className={`form-control rounded-0`} />
            </div>

            <div>
                <hr />
                <Link to="/update-profile" className='buttonP'>Actualizar Información</Link>
            </div>
            <div>
                <Link to="/home" className='buttonP1'>Atrás</Link>
            </div>
            <div className='text'>Talent Switch</div>
        </section>
    );
}

export default MyProfile;