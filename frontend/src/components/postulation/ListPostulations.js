import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../styles/bootstrap.min.css'; 

function ListPostulations() {
    const [postulations, setPostulations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/list-postulations')
            .then(res => {
                setPostulations(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const getRowClassName = (postulation) => {
        return postulation.postulation_state === 'accepted' ? 'accepted-row' : 'pending-row';
    };

    return (
        <div className="List-Post container mt-5 mb-5">
            <h2 style={{ color: 'white' }}>Listado de postulaciones</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ color: 'white' }}>Nombre del postulante</th>
                        <th style={{ color: 'white' }}>Correo del postulante</th>
                        <th style={{ color: 'white' }}>Área actual del postulante</th>
                        <th style={{ color: 'white' }}>Áreas de interés del postulante</th>
                        <th style={{ color: 'white' }}>Estado de postulación</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {postulations.map(postulation => (
                        <tr key={postulation.id} className={getRowClassName(postulation)}>
                            <td style={{ color: 'white' }}>{postulation.postulant_name}</td>
                            <td style={{ color: 'white' }}>{postulation.postulant_email}</td>
                            <td style={{ color: 'white' }}>{postulation.postulant_actual_area}</td>
                            <td style={{ color: 'white' }}>{postulation.postulant_interest_area}</td>
                            <td style={{ color: 'white' }}>{postulation.postulation_state}</td>
                            <td>
                                <Link to={`/postulations/${postulation.postulation_id}`} className="btn btn-primary">Ver postulación</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div className='d-flex justify-content-center'>
                <Link to="/home" className='btn btn-secondary'>Atrás</Link>        
            </div>
            <div className='text-center mt-4' style={{ color: 'white' }}>
                <p>Talent Switch</p>
            </div>
        </div>
    );
}

export default ListPostulations;
