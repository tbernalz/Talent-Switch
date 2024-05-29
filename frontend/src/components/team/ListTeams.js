import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './../../styles/bootstrap.min.css'; 

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
            console.error("¡Hubo un error al obtener los datos del usuario!", error);
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
        <section className="container mt-5 mb-5 text-white">
            <div className="mb-4 text-center">
                <h2 className="text-white">Lista de equipos</h2>          
            </div>
            <div className="table-wrapper">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col" className="text-white">Nombre del equipo</th>
                            <th scope="col" className="text-white">Área del equipo</th>
                            <th scope="col" className="text-white">Fecha inicio</th>
                            <th scope="col" className="text-white">Fecha final</th>
                            <th scope="col" className="text-white"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {teams.map(team => (
                            <tr key={team.team_id}>
                                <td className="text-white">{team.team_name}</td>
                                <td className="text-white">{team.team_area}</td>
                                <td className="text-white">{formatDate(team.start_date)}</td>
                                <td className="text-white">{formatDate(team.final_date)}</td>
                                <td>
                                    <Link to={`/teams/${team.team_id}`} className="btn btn-primary">
                                        Ver equipo
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
                <Link to="/home" className="btn btn-secondary">Atrás</Link>        
            </div>
            <div className="text-center mt-4">
                <small className="text-white">Talent Switch</small>
            </div>
        </section>
    );
}

export default ListTeams;
