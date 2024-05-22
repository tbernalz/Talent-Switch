import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
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

    const [errors, setErrors] = useState({});

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
                setError("Team not Found"); // Establece el mensaje de error en caso de falla
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
                alert('User Added successfully')
            } else if(response.data === "member_exists"){
                alert("User is Already Part of this Team");
            } else if(response.data === "member_not_employee"){
                //cambiar el create-team para agregar automaticamente el leader respectivo 
                alert("Member is not an Employee");
            } else if(response.data === "user_not_exists"){
                alert("User not found or does not exist");
            } else{
                alert("An Error has Cccurred")
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

    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    return (
        <section>
            <div className="team-header">
                <h2>{team.team_name}</h2>
            </div>
            <div className="team-details">
                <p><strong>Correo del Lider:</strong> {team.team_leader_email}</p>
                <p><strong>Area del equipo:</strong> {team.team_area}</p>
                <p><strong>Descripción:</strong> {team.description}</p>
                <p><strong>Inicio de fecha:</strong> {formatDate(team.start_date)}</p>
                <p><strong>Final de fecha:</strong> {formatDate(team.final_date)}</p>
                <p><strong>Inicio de fecha:</strong> {formatDate(team.start_date)}</p>
                <p><strong>Final de fecha:</strong> {formatDate(team.final_date)}</p>
            </div>
            <hr/>
            <div>
                <div>
                    <form action='' onSubmit={handleSubmit}>
                        <input type="hidden" name="team_id" value={id} />
                        <div className='member-email'>
                        <div className='member-email'>
                            <label htmlFor='member_email'><strong>Correo de miembros</strong></label>
                            <input type="email" placeholder='ejemplo@tucorreo.com' name='member_email'
                            onChange={handleInput} className={'form-control rounded-0' + (errors.member_email ? ' is-invalid' : '')} />
                            {errors.member_email && <span className='text-danger'> {errors.member_email}</span>}
                        </div>
                        <div>
                            <button type='submit' className='buttonTdetails'>Agregar nuevo miembro</button>
                            <button type='submit' className='buttonTdetails'>Agregar nuevo miembro</button>
                        </div>
                    </form>
                </div>
                {/* Restringir ver solo leaders */}
                <hr />
                <div>
                    <Link to={`/teams/${id}/list-members`} className='buttonTmembers'>Ver miembros</Link>
                    <Link to={`/teams/${id}/list-members`} className='buttonTmembers'>Ver miembros</Link>
                </div>
                <hr/>
                <Link to="/list-teams" className="buttonTeamC1">Atrás</Link>
            </div>
            <div>
                <p className="dark_bg">Aun no se discierne la informacion de ambos perfiles, se hara proximamente.</p>
            </div>
            <div className='text'>Talent Switch</div>

        </section>
    );
}

export default TeamDetail;