import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importamos Link para manejar la navegación
import './../css/profile.css'; // css

function ListPostulations() {
    const [postulations, setPostulations] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/list-postulations')
            .then(res => {
                setPostulations(res.data);
            })
            .catch(err => console.log(err));
    }, []);

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
                        <th>Postulant Skills</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {postulations.map(postulation => (
                        <tr key={postulation.id}>
                            <td>{postulation.postulant_name}</td>
                            <td>{postulation.postulant_email}</td>
                            <td>{postulation.postulant_actual_area}</td>
                            <td>{postulation.postulant_interest_area}</td>
                            <td>{postulation.postulant_skills}</td>
                            {/* Agregar función de copiar al portapapeles */}
                            <td>Copy email</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Link to="/home" className='link'>Back</Link>        
            </div>
        </div>
    );
}

export default ListPostulations;