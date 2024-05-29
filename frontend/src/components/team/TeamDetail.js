import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/bootstrap.min.css'; 
import './../../styles/Team.css'; //css

function TeamDetail() {
    const { id } = useParams(); // Recupera el ID de la URL
    const [team, setTeam] = useState(null);
    const [error, setError] = useState(null);

    // Estado para los valores del formulario
    const [values, setValues] = useState({
        team_id: '',
        member_email: '',
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({ userName: '', email: '', userType: '' });

    //Revisión del tipo de Usuario para separar funciones
    useEffect(() => {
        axios.get(`http://localhost:8081/checkSession`, { withCredentials: true })
        .then(response => {
            setUser({
                userName: response.data.name,
                email: response.data.email,
                userType: response.data.user_type,
            });
          })
          .catch(error => {
            console.error("¡Hubo un error al obtener los datos del usuario!", error);
            navigate('/'); // Redirige a la página de inicio si hay un error de sesión
          });
    }, [navigate]);

    // Función para manejar cambios en los inputs del formulario
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    useEffect(() => {
        axios.get(`http://localhost:8081/teams/${id}`)
            .then(res => {
                setTeam(res.data);
                setValues(prev => ({...prev, team_id: id}));
            })
            .catch(err => {
                console.log(err);
                setError("Equipo No fue Encontrado"); // Establece el mensaje de error en caso de falla
            });
    }, [id]);

    if (error) {
        return (
            <section className="team-detail error">
                <p style={{ color: '#000' }}>{error}</p>
            </section>
        );
    }

    if (!team) {
        return (
            <section className="team-detail">
                <p>Loading...</p>
            </section>
        );
    }

    // Validación y envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validación del correo del solicitante
        if (!values.member_email) {
            setErrors({ member_email: "Email is required" });
            return;
        }

        // Datos a enviar al servidor
        const postData = {
            team_id: values.team_id,
            member_email: values.member_email
        };

        // Enviar datos al servidor
        axios.post('http://localhost:8081/add-member', postData)
        .then(response => {
            if(response.data === "Success"){
                alert('Usuario Agregado al Equipo Exitosamente')
            } else if(response.data === "member_exists"){
                alert("El Usuario ya es Miembro de este Equipo");
            } else if(response.data === "member_not_employee"){ 
                alert("El Miembro No es un Empleado");
            } else if(response.data === "user_not_exists"){
                alert("Usuario No Encontrado o No Existe");
            } else{
                alert("Ha Ocurrido un Error")
            }
        })
        .catch(error => console.log(error));
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <section className='team-detail'>
            <div className="team-header">
                <h2>{team.team_name}</h2>
            </div>
            <div className="team-details">
                <p><strong>Correo del Lider:</strong> {team.team_leader_email}</p>
                <p><strong>Area del equipo:</strong> {team.team_area}</p>
                <p><strong>Descripción:</strong> {team.description}</p>
                <p><strong>Inicio de fecha:</strong> {formatDate(team.start_date)}</p>
                <p><strong>Final de fecha:</strong> {formatDate(team.final_date)}</p>
            </div>
            <hr/>
            <div className="d-flex flex-column align-items-center">
                {/* Mostrar el formulario y el botón de aplicar solo para empleados */}
                {user.userType === 'leader' && (
                <div>
                    <form action='' onSubmit={handleSubmit}>
                        <input type="hidden" name="team_id" value={id} />
                        <div className='form-group'>
                            <label htmlFor='member_email'><strong>Correo de miembros</strong></label>
                            <input type="email" placeholder='Ingresa el correo' name='member_email'
                            onChange={handleInput} className={'form-control rounded-0' + (errors.member_email ? ' is-invalid' : '')} />
                            {errors.member_email && <div className='invalid-feedback'> {errors.member_email}</div>}
                        </div>
                        <div className="mt-2 text-center">
                            <button type='submit' className='btn btn-primary'>Agregar Nuevo Miembro</button>
                            <hr />
                        </div>
                    </form>
                </div>
                )}
                <div className="mt-2">
                    <Link to={`/teams/${id}/list-members`} className='btn btn-primary'>Ver Miembros</Link>
                    <hr />
                </div>
                <div>
                    {user.userType === 'employee' && (
                        <Link to="/list-my-teams" className="btn btn-secondary mt-2">Atrás</Link>
                    )}
                    {user.userType === 'leader' && (
                        <Link to="/list-teams" className="btn btn-secondary mt-2">Atrás</Link>
                    )}
                </div>
            </div>
            <div className='text'>Talent Switch</div>

        </section>
    );
}

export default TeamDetail;