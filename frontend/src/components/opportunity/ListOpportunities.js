import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './../../styles/bootstrap.min.css';
import './../../styles/Opportunity.css';

function ListOpportunities() {
    const { id } = useParams(); // Obtener el ID de la oportunidad de los parámetros de la URL
    const navigate = useNavigate();
    const [opportunities, setOpportunities] = useState([]);
    const [error, setError] = useState(null);
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
        axios.get('http://localhost:8081/list-opportunities')
            .then(res => {
                setOpportunities(res.data);
            })
            .catch(err => console.log(err));
    }, []);

    const getRowClassName = (opportunity) => {
        return opportunity.opportunity_state === 'open' ? 'accepted-row' : 'closed-row';
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="List-Opp">
            <h2>Lista de oportunidades</h2>
            {opportunities.length === 0 ? (
                <div>
                    <br />
                    <p>No hay Oportunidades disponibles en este momento, por favor inténtalo de nuevo más tarde</p>
                </div>
            ) : (
            <table>
                <thead>
                    <tr>
                        <th>Nombre oportunidad</th>
                        <th>Area de la oportunidad</th>
                        <th>Fecha de inicio</th>
                        <th>Fecha final</th>
                        <th>Estado de la oportunidad</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map(opportunity => (
                        <tr key={opportunity.opportunity_id} className={getRowClassName(opportunity)}>
                            <td>{opportunity.opportunity_name}</td>
                            <td>{opportunity.opportunity_area}</td>
                            <td>{formatDate(opportunity.start_date)}</td>
                            <td>{formatDate(opportunity.final_date)}</td>
                            <td>{opportunity.opportunity_state}</td>
                            <td>
                                <Link to={`/opportunities/${opportunity.opportunity_id}`} className="button-O">Ver oportunidad</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
            <div>
                <hr />
                <Link to="/home" className='buttonOpportunity2'>Atrás</Link>        
            </div>
            <div className='text'>Talent Switch</div>
        </div>
    );
}

export default ListOpportunities;
