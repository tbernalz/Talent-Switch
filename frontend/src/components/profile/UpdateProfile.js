import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css';

function UpdateProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: ''
    });

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
        <section className="container mt-5">
            <div className="text-center mb-4 mt-5 pt-5">
                <h2>Actualizar información</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Nombre</strong></label>
                    <input type="text" className="form-control" name="name" value={userData.name} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><strong>Correo</strong></label>
                    <input type="email" className="form-control" name="email" value={userData.email} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="actual_area" className="form-label"><strong>Area actual</strong></label>
                    <input type="text" className="form-control" name="actual_area" value={userData.actual_area} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="interest_area" className="form-label"><strong>Areas de interes</strong></label>
                    <input type="text" className="form-control" name="interest_area" value={userData.interest_area} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="skills" className="form-label"><strong>Habilidades</strong></label>
                    <input type="text" className="form-control" name="skills" value={userData.skills} onChange={handleInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="user_type" className="form-label"><strong>Tipo de usuario</strong></label>
                    <input type="text" className="form-control" name="user_type" value={userData.user_type} readOnly />
                </div>
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">Guardar</button>
                    <Link to="/my-profile" className="btn btn-secondary">Atrás</Link>
                </div>
                <div className="text-center mt-4">Talent Switch</div>
            </form>
        </section>
    );
}

export default UpdateProfile;