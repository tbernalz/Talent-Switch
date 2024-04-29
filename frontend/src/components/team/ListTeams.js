import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importamos Link para manejar la navegación
import './../../styles/Detail.css'; // css

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
        <div className="table-container">
            <h2>List of Teams</h2>
            <table>
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Team Area</th>
                        <th>Start Date</th>
                        <th>Final Date</th>
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
                                <Link to={`/teams/${team.team_id}`} className="link">View</Link>
                            </td>
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

export default ListTeams;