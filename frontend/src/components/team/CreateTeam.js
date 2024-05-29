import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/CreateTeamValidation';
import axios from 'axios';
import './../../styles/bootstrap.min.css';

function CreateTeam() {
    const [values, setValues] = useState({
        team_name: '',
        team_leader_email: '',
        team_area: '',
        description: '',
        start_date: '',
        final_date: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = Validation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).every(key => validationErrors[key] === "")) {
            axios.post('http://localhost:8081/create-team', values)
                .then(res => {
                    if (res.data === "Success") {
                        alert('Project Team was created');
                        navigate('/home');
                    } else {
                        alert("It was not possible to create the Project Team");
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <section className="container mt-5 mb-5">
            <form onSubmit={handleSubmit}>
                <div className="mb-4 text-center">
                    <h2>Crear proyecto de equipo</h2>
                </div>

                <div className="mb-3">
                    <label htmlFor="team_name" className="form-label"><strong>Nombre del equipo</strong></label>
                    <input type="text" placeholder="Ingrese el nombre del equipo" name="team_name" onChange={handleInput} className="form-control rounded-0" />
                    {errors.team_name && <span className="text-danger"> {errors.team_name}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="team_leader_email" className="form-label"><strong>Correo del líder de equipo</strong></label>
                    <input type="email" placeholder="Ingrese el correo del líder" name="team_leader_email" onChange={handleInput} className="form-control rounded-0" />
                    {errors.team_leader_email && <span className="text-danger"> {errors.team_leader_email}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="team_area" className="form-label"><strong>Área del equipo</strong></label>
                    <input type="text" placeholder="Ingrese el área del equipo" name="team_area" onChange={handleInput} className="form-control rounded-0" />
                    {errors.team_area && <span className="text-danger"> {errors.team_area}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="description" className="form-label"><strong>Descripción</strong></label>
                    <input type="text" placeholder="Ingrese la descripción" name="description" onChange={handleInput} className="form-control rounded-0" />
                    {errors.description && <span className="text-danger"> {errors.description}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="start_date" className="form-label"><strong>Fecha de inicio</strong></label>
                    <input type="date" name="start_date" onChange={handleInput} className="form-control rounded-0" />
                    {errors.start_date && <span className="text-danger"> {errors.start_date}</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="final_date" className="form-label"><strong>Fecha final</strong></label>
                    <input type="date" name="final_date" onChange={handleInput} className="form-control rounded-0" />
                    {errors.final_date && <span className="text-danger"> {errors.final_date}</span>}
                </div>

                <div className="d-flex justify-content-center gap-2 mb-3">
                    <button type="submit" className="btn btn-primary px-4">Crear</button>
                    <Link to="/home" className="btn btn-secondary px-4">Atrás</Link>
                </div>
            </form>
            <div className="text-center mt-4">
                <small className="text-muted">Talent Switch</small>
            </div>
        </section>
    );
}

export default CreateTeam;
