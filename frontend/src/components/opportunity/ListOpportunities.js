import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../../styles/bootstrap.min.css';
import './../../styles/Opportunity.css';

function ListOpportunities() {
    const [opportunities, setOpportunities] = useState([]);

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
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <div className="List-Opp">
            <h2>Lista de oportunidades</h2>
            <div className="table-wrapper">
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
                                {/* <td>{formatDate(opportunity.start_date)}</td>
                                <td>{formatDate(opportunity.final_date)}</td> */}
                                <td>{opportunity.opportunity_state}</td>
                                <td>
                                    <Link to={`/opportunities/${opportunity.opportunity_id}`} className="btn btn-primary">Ver oportunidad</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
            <hr />
            <div className="text-center">
                <Link to="/home" className='btn btn-secondary'>Atrás</Link>
            </div>
            <div className='text-center mt-4'>
                <p>Talent Switch</p>
            </div>
        </div>
    );
}

export default ListOpportunities;
