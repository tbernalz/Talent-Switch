import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importamos Link para manejar la navegación
import './../../styles/Detail.css'; // css

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
        <div className="table-container">
            <h2>List of Postulants</h2>
            <table>
                <thead>
                    <tr>
                        <th>Postulant Name</th>
                        <th>Postulant Area</th>
                        <th>Postulant Actual Area</th>
                        <th>Postulant Interest Area</th>
                        <th>Postulantion State</th>
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
                                <Link to={`/postulations/${postulation.postulation_id}`} className="link-button">View</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Link to="/home" className='link-button'>Back</Link>        
            </div>
        </div>
    );
}

export default ListPostulations;