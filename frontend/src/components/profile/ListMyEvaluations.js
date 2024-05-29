import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para manejar la navegación
import axios from 'axios';
import './../../styles/bootstrap.min.css';
import './../../styles/Team.css'; // css

const BASE_URL = process.env.REACT_APP_BASE_URL;

function ListMyEvaluations() {
    const [evaluations, setEvaluations] = useState([]);

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState({ userName: '', email: '' });

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`${BASE_URL}/checkSession`, { withCredentials: true })
          .then(response => {
            setUser({
                userName: response.data.name,
                email: response.data.email,
            });
          })
          .catch(error => {
            console.error("¡Hubo un error al obtener los datos del usuario!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

    useEffect(() => {
        if (user.email) {
            axios.get(`${BASE_URL}/list-my-evaluations?email=${user.email}`)
                .then(res => {
                    setEvaluations(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [user.email]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function formatStar(qualification){
        const totalStars = 5;
        let stars = '';
        for (let i = 0; i < totalStars; i++) {
            stars += i < qualification ? '★' : '☆';
        }
        return stars;
    }

    return (
        <div className="List-Teams">
            <h2>Lista de Evaluaciones</h2>
            <br /><p>Estas son las evaluaciones que te han dado, {user.userName}</p>
            {evaluations.length === 0 ? (
                <div>
                    <br />
                    <p>No has recibido Evaluaciones aún</p>
                </div>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Calificación</th>
                            <th>Comentario</th>
                            <th>Fecha de Evaluación</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map(evaluation => (
                            <tr key={evaluation.id}>
                                <td>{evaluation.qualification + formatStar(evaluation.qualification)}</td>
                                <td>{evaluation.comment}</td>
                                <td>{formatDate(evaluation.evaluation_date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <hr />
            <div>
                <Link to="/home" className='btn btn-secondary'>Atrás</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
    );
}

export default ListMyEvaluations;