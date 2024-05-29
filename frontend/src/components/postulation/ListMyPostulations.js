import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para manejar la navegación
import axios from 'axios';
import './../../styles/bootstrap.min.css';
import './../../styles/Postulation.css'; // css

function ListMyPostulations() {
    const [postulations, setPostulations] = useState([]);

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState({ userName: '', email: '' });

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get('http://localhost:8081/checkSession', { withCredentials: true })
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
            axios.get(`http://localhost:8081/list-my-postulations?email=${user.email}`)
                .then(res => {
                    setPostulations(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [user]);
    
    const getRowClassName = (postulation) => {
        return postulation.postulation_state === 'accepted' ? 'accepted-row' : 'pending-row';
    };

    return (
        <div className="List-Post container mt-5 mb-5">
            <h2>Listado de Postulaciones</h2>
            <br /><p>Postulaciones creadas por tí, {user.userName}</p>
            {postulations.length === 0 ? (
                <div>
                    <br />
                    <p>No te has Postulado todavía</p>
                </div>
            ) : (
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
                                <Link to={`/postulations/${postulation.postulation_id}`} className="btn btn-primary">Ver postulación</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            <div>
                <hr />
                <Link to="/home" className='btn btn-secondary'>Atrás</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
    );
}

export default ListMyPostulations;