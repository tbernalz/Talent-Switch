import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './../css/Detail.css'; // Importa tus estilos CSS personalizados

function PostulationDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [postulation, setPostulation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/postulations/${id}`)
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
        <section className="postulation-detail">
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
                <Link to="/list-postulations" className="link">Back</Link>        
            </div>
        </section>
    );
}

export default PostulationDetail;