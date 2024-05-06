import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './../css/Detail.css';

function ListMembers() {
    const { id } = useParams(); // team_id
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    const handleEvaluate = async (member) => {
        try {
            const response = await axios.post('http://localhost:8081/to-evaluate-member', {
                team_id: id, // Utiliza el team_id en lugar del id del miembro
                user_id: member.user_id,
                member_email: member.member_email
            });
            console.log(response.data); // Aquí podrías manejar la respuesta del servidor, si es necesario
    
            // Redirige al usuario a la página de evaluación después de hacer la solicitud POST
            window.location.href = `/evaluate-member/${id}/${member.user_id}/${member.member_email}`; // Cambio en la redirección
        } catch (error) {
            console.error('Error evaluating member:', error);
            // Aquí podrías manejar el error, por ejemplo, mostrando un mensaje al usuario
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8081/teams/${id}/list-members`)
            .then(res => {
                // Por cada miembro, realiza una consulta adicional para obtener su user_id
                const promises = res.data.map(member => {
                    return axios.get(`http://localhost:8081/get-user-id?email=${member.member_email}`)
                        .then(response => ({
                            ...member,
                            user_id: response.data.user_id // Recupera el user_id del miembro
                        }));
                });

                // Espera a que todas las consultas se completen
                Promise.all(promises)
                    .then(updatedMembers => {
                        setMembers(updatedMembers);
                    })
                    .catch(err => {
                        console.log(err);
                        setError("Error retrieving member data");
                    });
            })
            .catch(err => {
                console.log(err);
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

    return (
        <div className="table-container">
            <h2>List of Members for Team {id}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Member Email</th>
                        <th>Member Evaluation</th>
                    </tr>
                </thead>
                <tbody>
                    {members.map(member => (
                        <tr key={member.id}>
                            <td>{member.member_email}</td>
                            <td>
                                <button onClick={() => handleEvaluate(member)} className="link">Evaluate</button>
                            </td>
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