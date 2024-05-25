import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para manejar la navegación
import axios from 'axios';
import './../../styles/Team.css'; // css

function ListTeams() {
    const [teams, setTeams] = useState([]);

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

    useEffect(() => {
        axios.get('http://localhost:8081/list-teams')
            .then(res => {
                setTeams(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="List-Teams">
            <div className='lista'>
                <h2>Lista de equipos</h2>          
            </div>
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
                            <td>{formatDate(team.start_date)}</td>
                            <td>{formatDate(team.final_date)}</td>
                            <td>{formatDate(team.start_date)}</td>
                            <td>{formatDate(team.final_date)}</td>
                            <td>
                                <Link to={`/teams/${team.team_id}`} className="button-O">Ver equipo</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Link to="/home" className='buttonTeamC1'>Atrás</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
    );
}

export default ListTeams;