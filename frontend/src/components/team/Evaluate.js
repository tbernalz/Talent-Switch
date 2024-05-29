import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css'; 

function Evaluate() {
    const [error, setError] = useState(null);
    const { id, user_id, member_email } = useParams();

    const [values, setValues] = useState({
        qualification: '',
        comment: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("¡Hubo un error al obtener los datos del usuario!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

    useEffect(() => {
        if (id && user_id && member_email) {
            fetch('http://localhost:8081/to-evaluate-member', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, user_id, member_email })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {})
            .catch(error => {
                setError(error.message);
            });
        }
    }, [id, user_id, member_email]);

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!values.qualification) {
            setErrors({ qualification: "Qualification is required" });
            return;
        }

        if (!values.comment) {
            setErrors({ comment: "Comment is required" });
            return;
        }
    
        try {
            const postData = {
                evaluated_email: member_email,
                qualification: values.qualification,
                comment: values.comment
            };
    
            const response = await axios.post(`http://localhost:8081/evaluate-member`, postData);
    
            if (response.data === "Success") {
                alert('Usuario Evaluado Exitosamente');
                // Redirige al usuario a la lista de miembros
                navigate(`/teams/${id}/list-members`);
            } else {
                alert("Ha Ocurrido un Error en la Evaluación")
            }
        } catch (error) {
            console.error('Error evaluating member:', error);
        }
    };

    return (
        <section className="container mt-5 mb-5 text-white">
            <div className="text-center mb-4">
                <h3>Evaluacion</h3>
                <h5>{member_email}</h5>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='qualification' className="form-label"><strong>Calificacion:</strong></label>
                    <select id="qualification" name='qualification'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.qualification ? ' is-invalid' : '')}>
                            <option value='1'>1 Estrella: &#9733;</option>
                            <option value='2'>2 Estrellas: &#9733;&#9733;</option>
                            <option value='3'>3 Estrellas: &#9733;&#9733;&#9733;</option>
                            <option value='4'>4 Estrellas: &#9733;&#9733;&#9733;&#9733;</option>
                            <option value='5'>5 Estrellas: &#9733;&#9733;&#9733;&#9733;&#9733;</option>
                    </select>
                    {errors.qualification && <span className='text-danger'> {errors.qualification}</span>}
                </div>
                
                <div className='mb-3'>
                    <label htmlFor='comment' className="form-label"><strong>Comentarios:</strong></label>
                    <input type="text" placeholder='Ingresa tu comentario' name='comment'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.comment ? ' is-invalid' : '')} />
                    {errors.comment && <span className='text-danger'> {errors.comment}</span>}
                </div>
                <div className='d-grid gap-2'>
                    <button type='submit' className='btn btn-primary'>Evaluar</button>
                </div>
            </form>
            <hr />
            <div className='d-flex justify-content-center'>
                <Link to={`/teams/${id}/list-members`} className='btn btn-secondary'>Atrás</Link>
            </div>
            <div className='text-center mt-4'>
                <p>Talent Switch</p>
            </div>
        </section>
    );
}

export default Evaluate;
