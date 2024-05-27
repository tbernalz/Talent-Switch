import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Postulation.css'; // Importa tus estilos CSS personalizados

const BASE_URL = process.env.REACT_APP_BASE_URL;

function PostulationDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [postulation, setPostulation] = useState(null);
    const [error, setError] = useState(null);

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
        axios.get(`${BASE_URL}/postulations/${id}`)
            .then(res => {
                setPostulation(res.data);
            })
            .catch(err => {
                console.log(err);
                setError("Postulant not Found"); // Establece el mensaje de error en caso de falla
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
        <section>
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
                <Link to="/list-postulations" className="buttonPostulation3">Atras</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </section>
    );
}

export default PostulationDetail;