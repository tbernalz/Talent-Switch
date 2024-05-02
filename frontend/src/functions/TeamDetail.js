import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './../css/Detail.css'; // Importa tus estilos CSS personalizados

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
                navigate('/list-teams');
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

    return (
        <section className="team-detail">
            <div className="team-header">
                <h2>{team.team_name}</h2>
            </div>
            <div className="team-details">
                <p><strong>Team Leader Email:</strong> {team.team_leader_email}</p>
                <p><strong>Team Area:</strong> {team.team_area}</p>
                <p><strong>Description:</strong> {team.description}</p>
                <p><strong>Start Date:</strong> {team.start_date}</p>
                <p><strong>Final Date:</strong> {team.final_date}</p>
            </div>
            <hr/>
            <div>
                <div>
                    <form action='' onSubmit={handleSubmit}>
                        <input type="hidden" name="team_id" value={id} />
                        <div className='inputbox'>
                            <label htmlFor='member_email'><strong>Member Email</strong></label>
                            <input type="email" placeholder='Enter Member Email' name='member_email'
                            onChange={handleInput} className={'form-control rounded-0' + (errors.member_email ? ' is-invalid' : '')} />
                            {errors.member_email && <span className='text-danger'> {errors.member_email}</span>}
                        </div>
                        <div>
                            <button type='submit' className='button'>Add New Member</button>
                        </div>
                    </form>
                </div>
                {/* Restringir ver solo leaders */}
                <hr />
                <div>
                    <Link to={`/teams/${id}/list-members`} className='link'>See Members</Link>
                </div>
                <hr/>
                <Link to="/list-teams" className="link">Back</Link>
            </div>
            <div>
                <p className="dark_bg">This page generalizes the functions of both types of users, later they will be separated.</p>
            </div>
        </section>
    );
}

export default TeamDetail;