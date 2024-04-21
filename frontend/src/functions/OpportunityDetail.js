import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './../css/OpportunityDetail.css'; // Importa tus estilos CSS personalizados

function OpportunityDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [opportunity, setOpportunity] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/opportunities/${id}`)
            .then(res => {
                setOpportunity(res.data);
            })
            .catch(err => {
                console.log(err);
                setError("Opportunity not Found"); // Establece el mensaje de error en caso de falla
            });
    }, [id]); // Asegúrate de que useEffect se ejecute cuando cambie el ID

    if (error) {
        return (
            <section className="opportunity-detail error">
                <p style={{ color: '#000' }}>{error}</p>
            </section>
        );
    }

    if (!opportunity) {
        return (
            <section className="opportunity-detail">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className="opportunity-detail">
            <div className="opportunity-header">
                <h2>{opportunity.opportunity_name}</h2>
            </div>
            <div className="opportunity-details">
                <p><strong>Opportunity Leader Email:</strong> {opportunity.opportunity_leader_email}</p>
                <p><strong>Opportunity Area:</strong> {opportunity.opportunity_area}</p>
                <p><strong>Description:</strong> {opportunity.description}</p>
                <p><strong>Required Skills:</strong> {opportunity.required_skills}</p>
                <p><strong>Start Date:</strong> {opportunity.start_date}</p>
                <p><strong>Final Date:</strong> {opportunity.final_date}</p>
            </div>
            <hr />
            <div>
                <Link to="/list-opportunities" className="link">Back</Link>        
            </div>
        </section>
    );
}

export default OpportunityDetail;