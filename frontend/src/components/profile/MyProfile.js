import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Perfil.css'; // css

function MyProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: ''
    });

    useEffect(() => {
        axios.get('URL_DEL_BACKEND') // Endpoint para obtener datos del perfil del usuario
            .then(res => {
                setUserData(res.data);})
            .catch(err => console.log(err));}, []);

    return (
        <section>
            <h2>Mi perfil</h2>
            <div className='Name'>
                <label htmlFor='name'><strong>Nombre</strong></label>
                <input type="text" value={userData.name} readOnly /></div>
            <div className='Email'>
                <label htmlFor='email'><strong>Correo</strong></label>
                <input type="email" value={userData.email} readOnly /></div>
            <div className='Actual-area'>
                <label htmlFor='actual_area'><strong>Area actual</strong></label>
                <input type="text" value={userData.actual_area} readOnly /></div>
            <div className='Interest-Area'>
                <label htmlFor='interest_areas'><strong>Areas de interes</strong></label>
                <input type="text" value={userData.interest_area} readOnly /></div>
            <div className='Skills'>
                <label htmlFor='skills'><strong>Habilidades</strong></label>
                <input type="text" value={userData.skills} readOnly />
            </div>
            <div className='User-Type'>
                <label htmlFor='user_type'><strong>Tipo de usuario</strong></label>
                <input type="text" value={userData.user_type} readOnly /></div>
            <div>
                <Link to="/update-profile" className='buttonP'>Actualizar informacion</Link>
                </div>
                <div>
                    <Link to="/home" className='button2'>Atras</Link>        
                </div>
            <div className='text'>Talent Switch</div>
        </section>
    );
}

export default MyProfile;