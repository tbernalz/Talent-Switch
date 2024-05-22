import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importamos Link para manejar la navegación
import './../../styles/Postulation.css'; // css

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
                                <Link to={`/postulations/${postulation.postulation_id}`} className="buttonViewP">Ver postulación</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Link to="/home" className='buttonPostulation2'>Atrás</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
    );
}

export default ListPostulations;