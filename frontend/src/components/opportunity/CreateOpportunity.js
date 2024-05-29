import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/CreateOpportunityValidation';
import axios from 'axios';
import './../../styles/bootstrap.min.css'; 
import './../../styles/Opportunity.css';

function CreateOpportunity() {
    const [values, setValues] = useState({
        opportunity_name: '',
        opportunity_leader_email: '',
        opportunity_area: '',
        description: '',
        required_skills: '',
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
            axios.post('http://localhost:8081/create-opportunity', values)
                .then(res => {
                    if (res.data === "Success") {
                        alert('Opportunity was created');
                        navigate('/home');
                    } else {
                        alert("It was not possible to create the opportunity");
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <section className="container mt-5 mb-5 text-white">
            <form onSubmit={handleSubmit}>
                <h2>Crear oportunidades</h2>

                <div className='form-group'>
                    <label htmlFor='opportunity_name'><strong>Nombre oportunidad</strong></label>
                    <input type="text" placeholder='Ingresa el nombre de la oportunidad' name='opportunity_name'
                        onChange={handleInput} className={'form-control' + (errors.opportunity_name ? ' is-invalid' : '')} />
                    {errors.opportunity_name && <div className='invalid-feedback'> {errors.opportunity_name}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='opportunity_leader_email'><strong>Correo del lider de la oportunidad</strong></label>
                    <input type="text" placeholder='Ingresa el correo del lider' name='opportunity_leader_email'
                        onChange={handleInput} className={'form-control' + (errors.opportunity_leader_email ? ' is-invalid' : '')} />
                    {errors.opportunity_leader_email && <div className='invalid-feedback'> {errors.opportunity_leader_email}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='opportunity_area'><strong>Area de la oportunidad</strong></label>
                    <input type="text" placeholder='Ingresa el area del lider' name='opportunity_area'
                        onChange={handleInput} className={'form-control' + (errors.opportunity_area ? ' is-invalid' : '')} />
                    {errors.opportunity_area && <div className='invalid-feedback'> {errors.opportunity_area}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='description'><strong>Descripción</strong></label>
                    <input type="text" placeholder='Ingresa la descripción' name='description'
                        onChange={handleInput} className={'form-control' + (errors.description ? ' is-invalid' : '')} />
                    {errors.description && <div className='invalid-feedback'> {errors.description}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='required_skills'><strong>Habilidades requeridas</strong></label>
                    <input type="text" placeholder='Ingresa que habilidades se requieren' name='required_skills'
                        onChange={handleInput} className={'form-control' + (errors.required_skills ? ' is-invalid' : '')} />
                    {errors.required_skills && <div className='invalid-feedback'> {errors.required_skills}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='start_date'><strong>Fecha de inicio</strong></label>
                    <input type="date" name="start_date"
                        onChange={handleInput} className={'form-control' + (errors.start_date ? ' is-invalid' : '')} />
                    {errors.start_date && <div className='invalid-feedback'> {errors.start_date}</div>}
                </div>

                <div className='form-group'>
                    <label htmlFor='final_date'><strong>Fecha final</strong></label>
                    <input type="date" name="final_date"
                        onChange={handleInput} className={'form-control' + (errors.final_date ? ' is-invalid' : '')} />
                    {errors.final_date && <div className='invalid-feedback'> {errors.final_date}</div>}
                </div>

                <div className='form-group text-center'>
                    <button type='submit' className='btn btn-primary'>Crear</button>
                </div>
            </form>
            <hr />
            <div className='text-center'>
                <Link to="/home" className='btn btn-secondary'>Atrás</Link>
            </div>
            <div className='text-center mt-4'>
                <p>Talent Switch</p>
            </div>
        </section>
    );
}

export default CreateOpportunity;
