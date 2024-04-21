import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './../css/Detail.css'; // Importa tus estilos CSS personalizados

function TeamDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [team, setTeam] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/teams/${id}`)
            .then(res => {
                setTeam(res.data);
            })
            .catch(err => {
                console.log(err);
                setError("Team not Found"); // Establece el mensaje de error en caso de falla
            });
    }, [id]);

    if (error) {
        return (
            <section className="team-detail error">
                <p style={{ color: '#000' }}>{error}</p>
            </section>
        );
    }

    if (!team) {
        return (
            <section className="team-detail">
                <p>Loading...</p>
            </section>
        );
    }

    return (
        <section className="team-detail">
            <div className="team-header">
                <h2>{team.team_name}</h2>
            </div>
            <div className="team-details">
                <p><strong>Team Leader Email:</strong> {team.team_leader_email}</p>
                <p><strong>Team Area:</strong> {team.team_area}</p>
                <p><strong>Description:</strong> {team.description}</p>
                <p><strong>Start Date:</strong> {team.start_date}</p>
                <p><strong>Final Date:</strong> {team.final_date}</p>
            </div>
            <hr />
            <div>
                <Link to="/list-teams" className="link">Back</Link>        
            </div>
        </section>
    );
}

export default TeamDetail;