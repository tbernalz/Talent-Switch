import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from '../../utils/validations/CreateTeamValidation';
import axios from 'axios';
import './../../styles/bootstrap.min.css'; 
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
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState({})

    //Validación de Sesión
    useEffect(() => {
        axios.get('http://localhost:8081/checkSession', { withCredentials: true })
          .then(response => {
            setUser(response.data);
            setValues(prevValues => ({
                ...prevValues,
                team_leader_email: response.data.email // Configurar el email del líder automáticamente
            }));
            if (response.data.user_type !== 'leader') {
                alert('Solo los líderes pueden crear Equipos de Trabajo.');
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
            axios.post('http://localhost:8081/create-team', values)
                .then(res => {
                    if (res.data === "Success") {
                        alert('Equipo de Trabajo fue Creado');
                        navigate('/home');
                    } else {
                        alert("No fue Posible Crear el Equipo de Trabajo");
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err));
        }
    };


  return (
    <section className="container mt-5 mb-5">
        <form  action='' onSubmit={handleSubmit}>
            <div className="mb-4 text-center">
                <h2>Crear proyecto de equipo</h2>
            </div>
            <div className='form-group'>
                <label htmlFor='team_name'><strong>Nombre del equipo</strong></label>
                <input type="text" placeholder='Ingrese el nombre del equipo' name='team_name'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.team_name && <div className='invalid-feedback'> {errors.team_name}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='team_leader_email'><strong>Correo del lider de equipo</strong></label>
                <input type="text"  name='team_leader_email'
                 value={values.team_leader_email} readOnly
                 className='form-control rounded-0' />
            </div>

            <div className='form-group'>
                <label htmlFor='team_area'><strong>Area del equipo</strong></label>
                <input type="text" placeholder='Ingrese el area del equipo' name='team_area'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.team_area && <div className='invalid-feedback'> {errors.team_area}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='description'><strong>Descripción</strong></label>
                <input type="text" placeholder='Ingrese la descripción' name='description'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.description && <div className='invalid-feedback'> {errors.description}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='start_date'><strong>Fecha de inicio</strong></label>
                <input type="date" name="start_date" onChange={handleInput} className='form-control rounded-0' />
                {errors.start_date && <div className='invalid-feedback'> {errors.start_date}</div>}
            </div>

            <div className='form-group'>
                <label htmlFor='final_date'><strong>Fecha final</strong></label>
                <input type="date" name="final_date" onChange={handleInput} className='form-control rounded-0' />
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