import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../../utils/validations/CreateTeamValidation';
import axios from 'axios';
import './../../styles/Team.css'; // css

function CreateOpportunity() {
    const [values, setValues] = useState({
        team_name: '',
        team_leader_email: '',
        team_area: '',
        description: '',
        start_date: '',
        final_date: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})

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
    <section>
        <form  action='' onSubmit={handleSubmit}>
            <div className='createProject'>
            <h2>Crear proyecto de equipo</h2>
            </div>
            
            <div className='Team-Name'>
                <label htmlFor='team_name'><strong>Nombre del equipo</strong></label>
                <input type="text" placeholder='Ingrese el nombre del equipo' name='team_name'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.team_name && <span className='text-danger'> {errors.team_name}</span>}
            </div>

            <div className='Team-Email'>
                {/* Pensar cambiar por no mostrar */}
                <label htmlFor='team_leader_email'><strong>Correo del lider de equipo</strong></label>
                <input type="text" placeholder='Ingrese el correo del lider' name='team_leader_email'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.team_leader_email && <span className='text-danger'> {errors.team_leader_email}</span>}
            </div>

            <div className='Team-Area'>
                <label htmlFor='team_area'><strong>Area del equipo</strong></label>
                <input type="text" placeholder='Ingrese el area del equipo' name='team_area'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.team_area && <span className='text-danger'> {errors.team_area}</span>}
            </div>

            <div className='Team-Description'>
                <label htmlFor='description'><strong>Descripción</strong></label>
                <input type="text" placeholder='Ingrese la descripción' name='description'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.description && <span className='text-danger'> {errors.description}</span>}
            </div>

            <div className='Team-Start'>
                <label htmlFor='start_date'><strong>Fecha de inicio</strong></label>
                <input type="date" name="start_date" onChange={handleInput} className='form-control rounded-0' />
                {errors.start_date && <span className='text-danger'> {errors.start_date}</span>}
            </div>

            <div className='Team-End'>
                <label htmlFor='final_date'><strong>Fecha final</strong></label>
                <input type="date" name="final_date" onChange={handleInput} className='form-control rounded-0' />
                {errors.final_date && <span className='text-danger'> {errors.final_date}</span>}
            </div>

            <div>
                <button type='submit' className='buttonTeamC'>Crear</button>    
            </div>
            <div>
                <hr/>
                <div>
                    <Link to="/home" className='buttonTeamC1'>Atras</Link>        
                </div>
            </div>
        </form>
        <div className='text'>Talent Switch</div>
    </section>
  );
}

export default CreateOpportunity;