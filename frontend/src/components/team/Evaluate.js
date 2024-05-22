import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Team.css'; //css

function Evaluate() {
    //parametros recibidos
    const [error, setError] = useState(null);
    const { id, user_id, member_email } = useParams(); // Cambio aquí

    //parametros enviados
    const [values, setValues] = useState({
        qualification: '',
        comment: ''
    });
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        console.log("Received props: ", { id, user_id, member_email });
        // Verifica si todos los datos están disponibles
        if (id && user_id && member_email) {
            // Hacer la solicitud POST al servidor
            fetch('http://localhost:8081/to-evaluate-member', { // Reemplaza el puerto por el correcto
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, user_id, member_email })//datos que se reciben
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Podrías realizar acciones adicionales aquí si es necesario
            })
            .catch(error => {
                // Manejo de cualquier error
                setError(error.message);
            });
        }
    }, [id, user_id, member_email]); // Ejecutar efecto cuando cualquiera de estos datos cambie

    if (error) {
        return (
            <div className="evaluate-container">
                <p style={{ color: '#000' }}>{error}</p>
            </div>
        );
    }

    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

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
                alert('User Evaluated successfully');
                // Redirige al usuario a la lista de miembros
                navigate(`/teams/${id}/list-members`);
            } else {
                alert("An Error has Occurred in Evaluation")
            }
        } catch (error) {
            console.error('Error evaluating member:', error);
            // Handle error if needed
        }
    };

    return (
        <section>
            <div className="evaluateHeader">
        <section>
            <div className="evaluateHeader">
                <h3>Evaluacion</h3>
                <h5>{member_email}</h5>
                {/* <p>ID: {id}</p> */}
                {/* <p>User ID: {user_id}</p> */}
            </div>
            <form onSubmit={handleSubmit}>
                <div className='Qualification'>
                    <label htmlFor='qualification'><strong>Calificacion:</strong></label>
                    <select id="qualification" name='qualification'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.qualification ? ' is-invalid' : '')}>
                            <option value='1'>1 Estrella:  &#9733;</option>
                            <option value='2'>2 Estrellas: &#9733;&#9733;</option>
                            <option value='3'>3 Estrellas: &#9733;&#9733;&#9733;</option>
                            <option value='4'>4 Estrellas: &#9733;&#9733;&#9733;&#9733;</option>
                            <option value='5'>5 Estrellas: &#9733;&#9733;&#9733;&#9733;&#9733;</option>
                    </select>
                    {errors.qualification && <span className='text-danger'> {errors.qualification}</span>}
                </div>
                
                <div className='Comment'>
                    <label htmlFor='comment'><strong>Comentarios:</strong></label>
                    <input type="text" placeholder='Ingresa tu comentario' name='comment'
                        onChange={handleInput} className={'form-control rounded-0' + (errors.comment ? ' is-invalid' : '')} />
                    {errors.comment && <span className='text-danger'> {errors.comment}</span>}
                </div>
                <div>
                    <button type='submit' className='buttonTmembers'>Evaluar</button>
                    <button type='submit' className='buttonTmembers'>Evaluar</button>
                </div>
            </form>
            <hr />
            <div className='button-container2'>
                <Link to={`/teams/${id}/list-members`} className='buttonBack'>Atrás</Link>
            </div>
            <div className='text'>Talent Switch</div>
        </section>
    );
}

export default Evaluate;