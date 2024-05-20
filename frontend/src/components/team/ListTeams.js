import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importamos Link para manejar la navegación
import './../../styles/Team.css'; // css

function ListTeams() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/list-teams')
            .then(res => {
                setTeams(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className="List-Teams">
            <h2>Lista de equipos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del equipo</th>
                        <th>Area del equipo</th>
                        <th>Fecha inicio</th>
                        <th>Fecha final</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.team_id}>
                            <td>{team.team_name}</td>
                            <td>{team.team_area}</td>
                            <td>{team.start_date}</td>
                            <td>{team.final_date}</td>
                            <td>
                                <Link to={`/teams/${team.team_id}`} className="button-O">Ver equipo</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Link to="/home" className='button2'>Atras</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
    );
}

export default ListTeams;