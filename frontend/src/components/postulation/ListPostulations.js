import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para manejar la navegación
import axios from 'axios';
import './../../styles/Postulation.css'; // css

const BASE_URL = process.env.REACT_APP_BASE_URL;

function ListPostulations() {
    const [postulations, setPostulations] = useState([]);

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`${BASE_URL}/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

    useEffect(() => {
        axios.get(`${BASE_URL}/list-postulations`)
            .then(res => {
                setPostulations(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const getRowClassName = (postulation) => {
        return postulation.postulation_state === 'accepted' ? 'accepted-row' : 'pending-row';
    };

    return (
        <div className="List-Post">
            <h2>Listado de postulaciones</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del postulante</th>
                        <th>Correo del postulante</th>
                        <th>Area actual del postulante</th>
                        <th>Areas de interes del postulante</th>
                        <th>Estado de postulación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {postulations.map(postulation => (
                        <tr key={postulation.id} className={getRowClassName(postulation)}>
                            <td>{postulation.postulant_name}</td>
                            <td>{postulation.postulant_email}</td>
                            <td>{postulation.postulant_actual_area}</td>
                            <td>{postulation.postulant_interest_area}</td>
                            <td>{postulation.postulation_state}</td>
                            <td>
                                <Link to={`/postulations/${postulation.postulation_id}`} className="buttonViewP">Ver postulación</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <hr />
                <Link to="/home" className='buttonPostulation2'>Atrás</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
    );
}

export default ListPostulations;