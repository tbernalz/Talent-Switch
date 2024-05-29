import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css'; 
import './../../styles/Team.css'; //css

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
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
          .then(response => {
            setUser(response.data);
          })
          .catch(error => {
            console.error("¡Hubo un error al obtener los datos del usuario!", error);
            navigate('/'); // Redirige a la página de inicio si no hay sesión
          });
    }, [navigate]);

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
                setError("Equipo No fue Enontrado");
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
        <section className="container mt-5 mb-5">
            <div className="ListaMiembros">
                <div className="mb-4 text-center">
                    <h2>Lista de miembros de equipo {id}</h2>
                </div>
                {members.length === 0 ? (//debería no ocurrir nunca por autoadicción del lider
                <div>
                    <br />
                    <p>No se han agregado miembros aún</p>
                </div>
                ) : (
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
                                <td className='text-center'>
                                    {user && member.member_email !== user.email ? (
                                        <button onClick={() => handleEvaluate(member)} className="btn btn-primary">Evaluar</button>
                                    ) : (
                                        <span>Este es tu usuario</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                <div className='text-center'>
                    <hr/>
                    <Link to={`/teams/${id}`} className='btn btn-secondary'>Atrás</Link>
                </div>
                <div className='text'>Talent Switch</div>
            </div>
        </section>
    );
}

export default ListMembers;