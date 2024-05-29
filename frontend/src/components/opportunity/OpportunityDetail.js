import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Detail.css'; // Importa tus estilos CSS personalizados
import './../../styles/bootstrap.min.css'; 

const BASE_URL = process.env.REACT_APP_BASE_URL;

function OpportunityDetail() {
    // Manejo de datos de la oportunidad seleccionada
    const { id } = useParams(); // Recupera el ID de la URL
    const [opportunity, setOpportunity] = useState(null);
    const [error, setError] = useState(null);

    // Estado para los valores del formulario
    const [values, setValues] = useState({
        opportunity_id: '',
        applicant_email: '',
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({ userName: '', email: '', userType: '' });

    //Revisión del tipo de Usuario para separar funciones
    useEffect(() => {
        axios.get(`${BASE_URL}/checkSession`, { withCredentials: true })
        .then(response => {
            setUser({
                userName: response.data.name,
                email: response.data.email,
                userType: response.data.user_type,
            });
            setValues(prev => ({
                ...prev,
                applicant_email: response.data.email // Establecer automáticamente el correo del aplicante
            }));
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



    // Obtener los detalles de la oportunidad al cargar el componente
    useEffect(() => {
        axios.get(`${BASE_URL}/opportunities/${id}`)
            .then(res => {
                setOpportunity(res.data);
                setValues(prev => ({...prev, opportunity_id: id}));
            })
            .catch(err => {
                console.log(err);
                setError("Oportunidad No Encontrada"); // Establece el mensaje de error en caso de falla
            });
    }, [id]);

    if (error) {
        return (
            <section className="opportunity-detail error">
                <p style={{ color: '#000' }}>{error}</p>
            </section>
        );
    }

    if (!opportunity) {
        return (
            <section className="opportunity-detail">
                <p>Loading...</p>
            </section>
        );
    }

    // Validación y envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();

        // Validación del correo del solicitante
        if (!values.applicant_email) {
            setErrors({ applicant_email: "Email is required" });
            return;
        }

        // Datos a enviar al servidor
        const postData = {
            opportunity_id: values.opportunity_id,
            applicant_email: values.applicant_email
        };

        // Enviar datos al servidor
        axios.post(`${BASE_URL}/add-applicant`, postData)
        .then(response => {
            if(response.data === "Success"){
                alert('Usuario Aplicó Exitosamente')
            } else if(response.data === "applicant_exists"){
                alert("El Usuario ya Aplicó para esta Oportunidad");
            } else if(response.data === "applicant_not_employee"){
                alert("El Aplicante No es un Empleado");
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
        <section className="opportunity-detail">
            <div className="opportunity-header">
                <h2>{opportunity.opportunity_name}</h2>
            </div>
            <div className="opportunity-details">
                <p><strong>Opportunity Leader Email:</strong> {opportunity.opportunity_leader_email}</p>
                <p><strong>Opportunity Area:</strong> {opportunity.opportunity_area}</p>
                <p><strong>Description:</strong> {opportunity.description}</p>
                <p><strong>Required Skills:</strong> {opportunity.required_skills}</p>
                <p><strong>Start Date:</strong> {formatDate(opportunity.start_date)}</p>
                <p><strong>Final Date:</strong> {formatDate(opportunity.final_date)}</p>
                <p><strong>Opportunity State:</strong> {opportunity.opportunity_state} </p>
            </div>
            <hr />
            <div className="d-flex flex-column align-items-center">
                {/* Mostrar el formulario y el botón de aplicar solo para empleados */}
                {user.userType === 'employee' && (
                    <div>
                        <form action='' onSubmit={handleSubmit}>
                            <input type="hidden" name="opportunity_id" value={id} />
                            <div className='form-group'>
                                <label htmlFor='applicant_email'><strong>Correo del aplicante</strong></label>
                                <input type="email" name='applicant_email'
                                    value={values.applicant_email} readOnly
                                    className='form-control rounded-0' />
                                {/* <input type="email" placeholder='Ingresa el correo del aplicante' name='applicant_email'
                                onChange={handleInput} className={'form-control rounded-0' + (errors.applicant_email ? ' is-invalid' : '')} />
                                {errors.applicant_email && <div className='invalid-feedback'> {errors.applicant_email}</div>} */}
                            </div>
                            <div className="mt-2 text-center">
                                <button type='submit' className='btn btn-primary'>Aplicar</button>
                                <hr/>
                            </div>
                        </form>
                    </div>
                )}
                {/* Mostrar el botón de ver aplicantes solo para líderes */}
                {user.userType === 'leader' && (
                    <div className="mt-2">
                        <Link to={`/opportunities/${id}/list-applicants`} className='btn btn-primary'>Ver aplicantes</Link>
                        <hr/>
                    </div>
                )}
                <div>
                    {user.userType === 'employee' && (
                        <Link to="/list-opportunities" className="btn btn-secondary mt-2">Atrás</Link>
                    )}
                    {user.userType === 'leader' && (
                        <Link to="/list-my-opportunities" className="btn btn-secondary mt-2">Atrás</Link>
                    )}
                </div>
            </div>
            <div className='text'>Talent Switch</div>
        </section>
        
    );
}

export default OpportunityDetail;