import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Validation from '../../utils/validations/UpdateValidation';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../../styles/PerfilU.css'; // Importar estilos CSS personalizados

function UpdateProfile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get('http://localhost:8081/checkSession', { withCredentials: true })
            .then(response => {
                const userEmail = response.data.email;
                axios.post('http://localhost:8081/my-profile', { email: userEmail })
                    .then(userDataResponse => {
                        setUser(userDataResponse.data);
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
        setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = Validation(user);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) {
            const { name, actual_area, interest_area, skills, email } = user;
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
        <section className="container mt-5">
            <div className="text-center mb-4 mt-5 pt-5">
                <h2>Actualizar información</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label"><strong>Nombre</strong></label>
                    <input type="text" className={`form-control${errors.name ? ' is-invalid' : ''}`} name="name" value={user.name} onChange={handleInput} />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label"><strong>Correo</strong></label>
                    <input type="email" className="form-control" name="email" value={user.email} readOnly />
                </div>
                <div className="mb-3">
                    <label htmlFor="actual_area" className="form-label"><strong>Area actual</strong></label>
                    <input type="text" className={`form-control${errors.actual_area ? ' is-invalid' : ''}`} name="actual_area" value={user.actual_area} onChange={handleInput} />
                    {errors.actual_area && <div className="invalid-feedback">{errors.actual_area}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="interest_area" className="form-label"><strong>Areas de interes</strong></label>
                    <input type="text" className={`form-control${errors.interest_area ? ' is-invalid' : ''}`} name="interest_area" value={user.interest_area} onChange={handleInput} />
                    {errors.interest_area && <div className="invalid-feedback">{errors.interest_area}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="skills" className="form-label"><strong>Habilidades</strong></label>
                    <input type="text" className={`form-control${errors.skills ? ' is-invalid' : ''}`} name="skills" value={user.skills} onChange={handleInput} />
                    {errors.skills && <div className="invalid-feedback">{errors.skills}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="user_type" className="form-label"><strong>Tipo de usuario</strong></label>
                    <input type="text" className="form-control" name="user_type" value={user.user_type} readOnly />
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
