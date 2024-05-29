import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/CreateOpportunityValidation';
import axios from 'axios';
import './../../styles/bootstrap.min.css';
import './../../styles/Opportunity.css'; // css

const BASE_URL = process.env.REACT_APP_BASE_URL;

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
        axios.get(`${BASE_URL}/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
            setValues(prevValues => ({
                ...prevValues,
                opportunity_leader_email: response.data.email // Configurar el email del líder automáticamente
            }));
            if (response.data.user_type !== 'leader') {
                alert('Solo los líderes pueden crear oportunidades.');
                navigate('/home');
            }
          })
          .catch(error => {
            console.error("¡Hubo un error al obtener los datos del usuario!", error);
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
            axios.post(`${BASE_URL}/create-opportunity`, values)
                .then(res => {
                    if (res.data === "Success") {
                        alert('La Oportunidad fue Creada ');
                        navigate('/home');
                    } else {
                        alert("No fue Posible Crear la Oportunidad");
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err));
        }
    };
    


  return (
    <section className="container mt-5 mb-5 text-white">
        <form  action='' onSubmit={handleSubmit}>
            <h2>Crear oportunidades</h2>

            <div className='form-group'>
                <label htmlFor='opportunity_name'><strong>Nombre oportunidad</strong></label>
                <input type="text" placeholder='Ingresa el nombre de la oportunidad' name='opportunity_name'
                onChange={handleInput} className={'form-control rounded-0' + (errors.opportunity_name ? ' is-invalid' : '')} />
                {errors.opportunity_name && <div className='invalid-feedback'> {errors.opportunity_name}</div>}
            </div>

            <div className='form-group'>
                    <label htmlFor='opportunity_leader_email'><strong>Correo del líder de la oportunidad</strong></label>
                    <input type="text" name='opportunity_leader_email' 
                        value={values.opportunity_leader_email} readOnly
                        className='form-control rounded-0' />
            </div>

            <div className='form-group'>
                <label htmlFor='opportunity_area'><strong>Area de la oportunidad</strong></label>
                <input type="text" placeholder='Ingresa el area del lider' name='opportunity_area'
                onChange={handleInput} className={'form-control rounded-0' + (errors.opportunity_area ? ' is-invalid' : '')}/>
                {errors.opportunity_area && <div className='invalid-feedback'> {errors.opportunity_area}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='description'><strong>Descripción</strong></label>
                <input type="text" placeholder='Ingresa la descripción' name='description'
                onChange={handleInput} className={'form-control rounded-0' + (errors.description ? ' is-invalid' : '')}/>
                {errors.description && <div className='invalid-feedback'> {errors.description}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='required_skills'><strong>Habilidades requeridas</strong></label>
                <input type="text" placeholder='Ingresa que habilidades se requieren' name='required_skills'
                onChange={handleInput} className={'form-control rounded-0' + (errors.required_skills ? ' is-invalid' : '')}/>
                {errors.required_skills && <div className='invalid-feedback'> {errors.required_skills}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='start_date'><strong>Fecha de inicio</strong></label>
                <input type="date" name="start_date" 
                onChange={handleInput} className={'form-control rounded-0' + (errors.start_date ? ' is-invalid' : '')}/>
                {errors.start_date && <div className='invalid-feedback'> {errors.start_date}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='final_date'><strong>Fecha final</strong></label>
                <input type="date" name="final_date" 
                onChange={handleInput} className={'form-control rounded-0' + (errors.final_date ? ' is-invalid' : '')}/>
                {errors.final_date && <div className='invalid-feedback'> {errors.final_date}</div>}
            </div>
            <br/>
            <div className='form-group text-center'>
                <button type='submit' className='btn btn-primary'>Crear</button>
            </div>
            <hr/>
            <div className='text-center'>
                <Link to="/home" className='btn btn-secondary'>Atrás</Link>
            </div>
        </form>
        <div className='text'>Talent Switch</div>
    </section>
  );
}

export default CreateOpportunity;