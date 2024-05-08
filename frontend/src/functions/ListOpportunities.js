import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Importamos Link para manejar la navegación
import './../css/Detail.css'; // css

function ListOpportunities() {
    const [opportunities, setOpportunities] = useState([]);

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

    return (
        <div className="table-container">
            <h2>List of Opportunities</h2>
            <table>
                <thead>
                    <tr>
                        <th>Opportunity Name</th>
                        <th>Opportunity Area</th>
                        <th>Start Date</th>
                        <th>Final Date</th>
                        <th>Opportunity State</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {opportunities.map(opportunity => (
                        <tr key={opportunity.opportunity_id} className={getRowClassName(opportunity)}>
                            <td>{opportunity.opportunity_name}</td>
                            <td>{opportunity.opportunity_area}</td>
                            <td>{opportunity.start_date}</td>
                            <td>{opportunity.final_date}</td>
                            <td>{opportunity.opportunity_state}</td>
                            <td>
                                <Link to={`/opportunities/${opportunity.opportunity_id}`} className="link">View</Link>
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

export default ListOpportunities;