import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../styles/Perfil.css'; // Importar estilos CSS personalizados
import './../../styles/PerfilU.css'; // Importar estilos CSS personalizados

function MyProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: ''
    });

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
        <section className="container mt-5 mb-5 profile-container">
            <div className="text-center mb-4 mt-3 pt-3">
                <h2>Mi perfil</h2>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label"><strong>Nombre</strong></label>
                    <input type="text" className="form-control" id="name" value={user.name} readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="email" className="form-label"><strong>Correo</strong></label>
                    <input type="email" className="form-control" id="email" value={user.email} readOnly />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="actual_area" className="form-label"><strong>Área actual</strong></label>
                    <input type="text" className="form-control" id="actual_area" value={user.actual_area} readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="interest_areas" className="form-label"><strong>Áreas de interés</strong></label>
                    <input type="text" className="form-control" id="interest_areas" value={user.interest_area} readOnly />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label htmlFor="skills" className="form-label"><strong>Habilidades</strong></label>
                    <input type="text" className="form-control" id="skills" value={user.skills} readOnly />
                </div>
                <div className="col-md-6 mb-3">
                    <label htmlFor="user_type" className="form-label"><strong>Tipo de usuario</strong></label>
                    <input type="text" className="form-control" id="user_type" value={user.user_type} readOnly />
                </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
                <Link to="/update-profile" className="btn btn-primary me-3">Actualizar información</Link>
                <Link to="/home" className="btn btn-secondary">Atrás</Link>
            </div>
            <div className="text-center mt-4">
                <small className="text-muted">Talent Switch</small>
            </div>
        </section>
    );
}

export default MyProfile;
