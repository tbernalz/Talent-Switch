import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css';
import './../../styles/Postulation.css'; // Importa tus estilos CSS personalizados

const BASE_URL = process.env.REACT_APP_BASE_URL;

function PostulationDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [postulation, setPostulation] = useState(null);
    const [error, setError] = useState(null);

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState({ userId: '', userName: '', email: '', userType: '' });

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
<<<<<<< HEAD
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
            .then(response => {
                setUser({
                    userId: response.data.user_id,
                    userName: response.data.name,
                    email: response.data.email,
                    userType: response.data.user_type,
                });
            })
            .catch(error => {
                console.error("¡Hubo un error al obtener los datos del usuario!", error);
                navigate('/'); // Redirige a la página de inicio si no hay sesión
            });
=======
        axios.get(`${BASE_URL}/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
>>>>>>> main
    }, [navigate]);

    useEffect(() => {
        axios.get(`${BASE_URL}/postulations/${id}`)
            .then(res => {
                setPostulation(res.data);
            })
            .catch(err => {
                console.log(err);
                setError("Postulante No Encontrado"); // Establece el mensaje de error en caso de falla
            });
    }, [id]);

    const handleAccept = () => {
        axios.put(`http://localhost:8081/postulations/${id}/accept`)
            .then(res => {
                if (res.data.success) {
                    setPostulation(prev => ({ ...prev, postulation_state: 'accepted' }));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };
        
    const handleReject = () => {
        axios.put(`http://localhost:8081/postulations/${id}/reject`)
            .then(res => {
                if (res.data.success) {
                    setPostulation(prev => ({ ...prev, postulation_state: 'rejected' }));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    if (error) {
        return (
            <section className="postulation-detail error">
                <p style={{ color: '#000' }}>{error}</p>
            </section>
        );
    }

    if (!postulation) {
        return (
            <section className="postulation-detail">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className="container mt-5 mb-5 text-white">
            <div className="postulation-header">
                <h2>{postulation.postulant_name}</h2>
            </div>
            <div className="postulation-details">
                <p><strong>Postulant Email:</strong> {postulation.postulant_email}</p>
                <p><strong>Postulant Actual Area:</strong> {postulation.postulant_actual_area}</p>
                <p><strong>Postulant Interest Area:</strong> {postulation.postulant_interest_area}</p>
                <p><strong>Postulant Skills:</strong> {postulation.postulant_skills}</p>
                <p><strong>Postulant State:</strong> {postulation.postulation_state}</p>
            </div>
            <hr />
            {user.userType === 'leader' && postulation.postulation_state === 'pending' && (
                <div className="button-container">
                    <button className="accept-button" onClick={handleAccept}>Aceptar</button>
                    <button className="reject-button" onClick={handleReject}>Rechazar</button>
                </div>
            )}
            <div>
                <hr/>
                {user.userType === 'employee' && (
                    <Link to="/list-my-postulations" className="btn btn-secondary mt-2">Atrás</Link>
                )}
                {user.userType === 'leader' && (
                    <Link to="/list-postulations" className="btn btn-secondary mt-2">Atrás</Link>
                )}
            </div>
            <div className='text'>Talent Switch</div>
        </section>
    );
}

export default PostulationDetail;