import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/CreateOpportunityValidation';
import axios from 'axios';
import './../../styles/Opportunity.css'; // css

function CreateOpportunity() {
    const [values, setValues] = useState({
        opportunity_name: '',
        opportunity_leader_email: '',
        opportunity_area: '',
        description: '',
        required_skills: '',
        start_date: '',
        final_date: ''
    })

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({})  

    //Validación de Sesión
    useEffect(() => {
        axios.get('http://localhost:8081/checkSession', { withCredentials: true })
          .then(response => {
            setUser(response.data);
            if (response.data.user_type !== 'leader') {
                alert('Solo los líderes pueden crear oportunidades.');
                navigate('/home');
            }
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/');
          });
      }, [navigate]);

    if (!user) {
        return null; // O un mensaje de carga si lo prefieres
    }

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
    <section>
        <form  action='' onSubmit={handleSubmit}>
            <h2>Crear oportunidades</h2>

            <div className='Opportunity-Name'>
                <label htmlFor='opportunity_name'><strong>Nombre oportunidad</strong></label>
                <input type="text" placeholder='Ingresa el nombre de la oportunidad' name='opportunity_name'
                onChange={handleInput} className={'form-control rounded-0' + (errors.opportunity_name ? ' is-invalid' : '')} />
                {errors.opportunity_name && <span className='text-danger'> {errors.opportunity_name}</span>}
            </div>

            <div className='Opportunity-leader'>
                {/* Pensar cambiar por no mostrar */}
                <label htmlFor='opportunity_leader_email'><strong>Correo del lider de la oportunidad</strong></label>
                <input type="text" placeholder='Ingresa el correo del lider' name='opportunity_leader_email'
                onChange={handleInput} className={'form-control rounded-0' + (errors.opportunity_leader_email ? ' is-invalid' : '')} />
                {errors.opportunity_leader_email && <span className='text-danger'> {errors.opportunity_leader_email}</span>}
            </div>

            <div className='Opportunity-Area'>
                <label htmlFor='opportunity_area'><strong>Area de la oportunidad</strong></label>
                <input type="text" placeholder='Ingresa el area del lider' name='opportunity_area'
                onChange={handleInput} className={'form-control rounded-0' + (errors.opportunity_area ? ' is-invalid' : '')}/>
                {errors.opportunity_area && <span className='text-danger'> {errors.opportunity_area}</span>}
            </div>

            <div className='Opportunity-Description'>
                <label htmlFor='description'><strong>Descripción</strong></label>
                <input type="text" placeholder='Ingresa la descripción' name='description'
                onChange={handleInput} className={'form-control rounded-0' + (errors.description ? ' is-invalid' : '')}/>
                {errors.description && <span className='text-danger'> {errors.description}</span>}
            </div>

            <div className='Opportunity-Skills'>
                <label htmlFor='required_skills'><strong>Habilidades requeridas</strong></label>
                <input type="text" placeholder='Ingresa que habilidades se requieren' name='required_skills'
                onChange={handleInput} className={'form-control rounded-0' + (errors.required_skills ? ' is-invalid' : '')}/>
                {errors.required_skills && <span className='text-danger'> {errors.required_skills}</span>}
            </div>

            <div className='Opportunity-Start'>
                <label htmlFor='start_date'><strong>Fecha de inicio</strong></label>
                <input type="date" name="start_date" 
                onChange={handleInput} className={'form-control rounded-0' + (errors.start_date ? ' is-invalid' : '')}/>
                {errors.start_date && <span className='text-danger'> {errors.start_date}</span>}
            </div>

            <div className='Opportunity-End'>
                <label htmlFor='final_date'><strong>Fecha final</strong></label>
                <input type="date" name="final_date" 
                onChange={handleInput} className={'form-control rounded-0' + (errors.final_date ? ' is-invalid' : '')}/>
                {errors.final_date && <span className='text-danger'> {errors.final_date}</span>}
            </div>

            <div>
                <button type='submit' className='buttonOpportunity'>Crear</button>    
            </div>
            <div>
                <hr/>
                <div>
                    {/* Css que no corresponde */}
                    <Link to="/home" className='buttonTeamC1'>Atrás</Link>        
                </div>
            </div>
        </form>
        <div className='text'>Talent Switch</div>
    </section>
  );
}

export default CreateOpportunity;