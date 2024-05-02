import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './../css/Detail.css';

function ListMembers() {
    const { id } = useParams(); // Obtener el ID de la oportunidad de los parámetros de la URL
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8081/teams/${id}/list-members`)
            .then(res => {
                setMembers(res.data);
            })
            .catch(err => {
                console.log(err)
                setError("Team not Found");
            });
    }, [id]);

    if (error) {
        return (
            <section className="team-detail error">
                <p style={{ color: '#000' }}>{error}</p>
            </section>
        );
    }

    //color por calificación
    // const getRowClassName = (member) => {
    //     if (member.evaluation_level >= 4) {
    //         return 'high-level-row';
    //     } else if (member.member.evaluation_level < 3) {
    //         return 'low-level-row';
    //     } else {
    //         return 'middle-level-row';
    //     }
    // };

    return (
        <div className="table-container">
            <h2>List of Members for Team {id}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Member Email</th>
                        {/*<th>Member Evaluation</th>*/ } {/* Adicionar busqueda en server */}
                        {/* <th></th> */}
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id} >
                        {/* className={getRowClassName(member)}> */}
                            <td>{member.member_email}</td>
                            {/* <td>{member.applicant_state}</td> */}
                            {/* <td>Botón de copiar Info</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Link to={`/teams/${id}`} className='link'>Back</Link>        
            </div>
        </div>
    );
}

export default ListMembers;