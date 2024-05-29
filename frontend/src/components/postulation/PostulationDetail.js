import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css'; // Importamos los estilos de Bootstrap
import './../../styles/Postulation.css'; // Importamos los estilos personalizados

function PostulationDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [postulation, setPostulation] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [user, setUser] = useState({ userName: '', email: '', userType: '' });

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
            .then(response => {
                setUser({
                    userName: response.data.name,
                    email: response.data.email,
                    userType: response.data.user_type,
                });
            })
            .catch(error => {
                console.error("¡Hubo un error al obtener los datos del usuario!", error);
                navigate('/'); // Redirige a la página de inicio si no hay sesión
            });
    }, [navigate]);

    useEffect(() => {
        axios.get(`http://localhost:8081/postulations/${id}`)
            .then(res => {
                setPostulation(res.data);
            })
            .catch(err => {
                console.log(err);
                setError("Postulante No Encontrado"); // Establece el mensaje de error en caso de falla
            });
    }, [id]);

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
            <div>
                {user.userType === 'employee' && (
                    <Link to="/list-my-postulations" className="buttonPostulation3">Atrás</Link>
                )}
                {user.userType === 'leader' && (
                    <Link to="/list-postulations" className="buttonPostulation3">Atrás</Link>
                )}
            </div>
            <div className='text'>Talent Switch</div>
        </section>
    );
}

export default PostulationDetail;
