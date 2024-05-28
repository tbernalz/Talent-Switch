import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importamos Link para manejar la navegación
import axios from 'axios';
import './../../styles/Opportunity.css'; // css

function ListMyOpportunities() {
    const [opportunities, setOpportunities] = useState([]);

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState({ userName: '', email: '' });

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
          .then(response => {
            setUser({
                userName: response.data.name,
                email: response.data.email,
            });
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

    useEffect(() => {
        if (user.email) {
            axios.get(`http://localhost:8081/list-my-opportunities?email=${user.email}`)
                .then(res => {
                    setOpportunities(res.data);
                })
                .catch(err => console.log(err));
        }
    }, [user]);

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
            <br /><p>Creadas por tí: {user.userName}</p>
            {opportunities.length === 0 ? (
                <div>
                    <br />
                    <p>No has creado ninguna Oportunidad aún</p>
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
                            {/* <td>{formatDate(opportunity.start_date)}</td>
                            <td>{formatDate(opportunity.final_date)}</td> */}
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

export default ListMyOpportunities;