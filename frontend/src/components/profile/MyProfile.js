import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css';

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
            .then(res => setUserData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <section className="container mt-5 mb-5 profile-container">
            <div className="text-center mb-4 mt-3 pt-3"> {/* Ajustado margen superior */}
                <h2>Mi perfil</h2>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label"><strong>Nombre</strong></label>
                    <input type="text" className="form-control" id="name" value={userData.name} readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label"><strong>Correo</strong></label>
                    <input type="email" className="form-control" id="email" value={userData.email} readOnly />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="actual_area" className="form-label"><strong>Área actual</strong></label>
                    <input type="text" className="form-control" id="actual_area" value={userData.actual_area} readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="interest_areas" className="form-label"><strong>Áreas de interés</strong></label>
                    <input type="text" className="form-control" id="interest_areas" value={userData.interest_area} readOnly />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="skills" className="form-label"><strong>Habilidades</strong></label>
                    <input type="text" className="form-control" id="skills" value={userData.skills} readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="user_type" className="form-label"><strong>Tipo de usuario</strong></label>
                    <input type="text" className="form-control" id="user_type" value={userData.user_type} readOnly />
                </div>
            </div>
            <div className="d-flex justify-content-between mt-4"> {/* Añadido margen superior */}
                <Link to="/update-profile" className="btn btn-primary me-3">Actualizar información</Link> {/* Añadido margen derecho */}
                <Link to="/home" className="btn btn-secondary">Atrás</Link>
            </div>
            <div className="text-center mt-4">
                <small className="text-muted">Talent Switch</small>
            </div>
        </section>
    );
}

export default MyProfile;
