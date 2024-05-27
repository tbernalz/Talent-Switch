import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Team.css'; //css

const BASE_URL = process.env.REACT_APP_BASE_URL;

function ListMembers() {
    const { id } = useParams(); // team_id
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    //Validación de Sesión
    const navigate = useNavigate();
    
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);

    // Revisar si hay sesión al cargar el componente
    useEffect(() => {
        axios.get(`${BASE_URL}/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("There was an error fetching the user data!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

    const handleEvaluate = async (member) => {
        try {
            const response = await axios.post(`${BASE_URL}/to-evaluate-member`, {
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
        axios.get(`${BASE_URL}/teams/${id}/list-members`)
            .then(res => {
                // Por cada miembro, realiza una consulta adicional para obtener su user_id
                const promises = res.data.map(member => {
                    return axios.get(`${BASE_URL}/get-user-id?email=${member.member_email}`)
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
        <section>
            <div className="ListaMiembros">
                <div className='memberList'>
                    <h2>Lista de miembros de equipo {id}</h2>
                </div>
                <table>
                    <thead>
                        <tr className='Barra'>
                            <th>Correo del miembro</th>
                            <th>Evaluaciones del miembro</th>
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(member => (
                            <tr key={member.id}>
                                <td>{member.member_email}</td>
                                <td>
                                    <button onClick={() => handleEvaluate(member)} className="buttonTmembers">Evaluar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr />
                <div>
                    <Link to={`/teams/${id}`} className='buttonTeamC1'>Atrás</Link>
                </div>
                <div className='text'>Talent Switch</div>
            </div>
        </section>
    );
}

export default ListMembers;