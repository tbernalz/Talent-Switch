import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Link, useNavigate } from 'react-router'
import './../css/profile.css'; // css

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
        <div className="table-container"> {/* Agregamos la clase "table-container" */}
            <h2>List of Teams</h2>
            <table>
                <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Team Area</th>
                        <th>Start Date</th>
                        <th>Final Date</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.map(team => (
                        <tr key={team.id}>
                            <td>{team.team_name}</td>
                            <td>{team.team_area}</td>
                            <td>{team.start_date}</td>
                            <td>{team.final_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListTeams;