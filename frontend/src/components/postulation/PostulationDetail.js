import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css';

function PostulationDetail() {
    const { id } = useParams();
    const [postulation, setPostulation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/postulations/${id}`)
            .then(res => {
                setPostulation(res.data);
            })
            .catch(err => {
                console.log(err);
                setError("Postulant not Found");
            });
    }, [id]);

    if (error) {
        return (
            <section className="container mt-5 mb-5 text-white">
                <div className="postulation-detail error">
                    <p>{error}</p>
                </div>
                <div className='text-center mt-4'>
                    <p>Talent Switch</p>
                </div>
            </section>
        );
    }

    if (!postulation) {
        return (
            <section className="container mt-5 mb-5 text-white">
                <div className="postulation-detail">
                    <p>Loading...</p>
                </div>
                <div className='text-center mt-4'>
                    <p>Talent Switch</p>
                </div>
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
            <div className='d-flex justify-content-center'>
                <Link to="/list-postulations" className="btn btn-secondary">Atrás</Link>        
            </div>
            <div className='text-center mt-4'>
                <p>Talent Switch</p>
            </div>
        </section>
    );
}

export default PostulationDetail;
