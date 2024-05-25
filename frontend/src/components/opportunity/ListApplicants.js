import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './../../styles/Applicants.css'; //css

function ListApplicants() {
    const { id } = useParams(); // Obtener el ID de la oportunidad de los parámetros de la URL
    const [applicants, setApplicants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/opportunities/${id}/list-applicants`)
            .then(res => {
                setApplicants(res.data);
            })
            .catch(err => {
                console.log(err)
                setError("Opportunity not Found");
            });
    }, [id]);

    const handleAccept = (applicantId) => {
        axios.put(`http://localhost:8081/opportunities/${id}/applicants/${applicantId}/accept`)
            .then(res => {
                if (res.data.success) {
                    setApplicants(applicants.map(applicant => {
                        if (applicant.id === applicantId) {
                            return { ...applicant, applicant_state: 'accepted' };
                        }
                        return applicant;
                    }));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    const handleReject = (applicantId) => {
        axios.put(`http://localhost:8081/opportunities/${id}/applicants/${applicantId}/reject`)
            .then(res => {
                if (res.data.success) {
                    setApplicants(applicants.map(applicant => {
                        if (applicant.id === applicantId) {
                            return { ...applicant, applicant_state: 'rejected' };
                        }
                        return applicant;
                    }));
                }
            })
            .catch(err => {
                console.error(err);
            });
    };

    if (error) {
        return (
            <section className="opportunity-detail error">
                <p style={{ color: '#000' }}>{error}</p>
            </section>
        );
    }

    const getRowClassName = (applicant) => {
        if (applicant.applicant_state === 'accepted') {
            return 'accepted-row';
        } else if (applicant.applicant_state === 'rejected') {
            return 'rejected-row';
        } else {
            return 'pending-row';
        }
    };

    return (
        <section>
        <div className="applicants">
            <h2>Lista de aplicantes por oportunidad {id}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Correo del aplicante</th>
                        <th>Estado del aplicante</th>
                        
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {applicants.map(applicant => (
                        <tr key={applicant.id} className={getRowClassName(applicant)}>
                            <td>{applicant.applicant_email}</td>
                            <td>{applicant.applicant_state}</td>
                            {/* <td>Botón de copiar Info</td> */}
                        <td>
                            {applicant.applicant_state === 'pending' && (
                                <div className="button-container">
                                    <button className="accept-button" onClick={() => handleAccept(applicant.id)}>Aceptar</button>
                                    <button className="reject-button" onClick={() => handleReject(applicant.id)}>Rechazar</button>
                                </div>
                            )}
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Link to={`/opportunities/${id}`} className='link'>Atras</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
        </section>
    );
}

export default ListApplicants;