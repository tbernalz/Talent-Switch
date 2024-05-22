import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Detail.css'; // Importa tus estilos CSS personalizados

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

    const [errors, setErrors] = useState({});

    // Función para manejar cambios en los inputs del formulario
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    }



    // Obtener los detalles de la oportunidad al cargar el componente
    useEffect(() => {
        axios.get(`http://localhost:8081/opportunities/${id}`)
            .then(res => {
                setOpportunity(res.data);
                setValues(prev => ({...prev, opportunity_id: id}));
            })
            .catch(err => {
                console.log(err);
                setError("Opportunity not Found"); // Establece el mensaje de error en caso de falla
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
        axios.post('http://localhost:8081/add-applicant', postData)
        .then(response => {
            if(response.data === "Success"){
                alert('User applied successfully')
            } else if(response.data === "applicant_exists"){
                alert("User has Already Applied for this Opportunity");
            } else if(response.data === "applicant_not_employee"){
                alert("Applicant is not an Employee");
            } else if(response.data === "user_not_exists"){
                alert("User not found or does not exist");
            } else{
                alert("An Error has Occurred")
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
            <div>
                <div>
                    <form action='' onSubmit={handleSubmit}>
                        <input type="hidden" name="opportunity_id" value={id} />
                        <div className='emailDetail'>
                            <label htmlFor='applicant_email'><strong>Correo del aplicante</strong></label>
                            <input type="email" placeholder='ejemplo@tucorreo.com' name='applicant_email'
                            onChange={handleInput} className={'form-control rounded-0' + (errors.applicant_email ? ' is-invalid' : '')} />
                            {errors.applicant_email && <span className='text-danger'> {errors.applicant_email}</span>}
                        </div>
                        <div>
                            <button type='submit' className='buttonOppDetail'>Aplicar</button>
                        </div>
                    </form>
                </div>
                {/* Restringir ver solo leaders y aplicar solo employees */}
                <hr />
                <div>
                    <Link to={`/opportunities/${id}/list-applicants`} className='buttonOppDetail2'>Ver aplicantes</Link>
                </div>
                <hr/>
                <Link to="/list-opportunities" className="buttonOppDetail3">Atras</Link>
            </div>
            <div>
                <p className="dark_bg">Aun no se discierne la informacion de ambos perfiles, se hara proximamente.</p>
            </div>
            <div className='text'>Talent Switch</div>
        </section>
        
    );
}

export default OpportunityDetail;