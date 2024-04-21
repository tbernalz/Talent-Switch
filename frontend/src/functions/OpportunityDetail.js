import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function OpportunityDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [opportunity, setOpportunity] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/opportunities/${id}`)
            .then(res => {
                setOpportunity(res.data);
            })
            .catch(err => console.log(err));
    }, [id]); // Asegúrate de que useEffect se ejecute cuando cambie el ID

    if (!opportunity) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{opportunity.opportunity_name}</h2>
            <p><strong>Opportunity Leader Email:</strong> {opportunity.opportunity_leader_email}</p>
            <p><strong>Opportunity Area:</strong> {opportunity.opportunity_area}</p>
            <p><strong>Description:</strong> {opportunity.description}</p>
            <p><strong>Required Skills:</strong> {opportunity.required_skills}</p>
            <p><strong>Start Date:</strong> {opportunity.start_date}</p>
            <p><strong>Final Date:</strong> {opportunity.final_date}</p>
        </div>
    );
}

export default OpportunityDetail;