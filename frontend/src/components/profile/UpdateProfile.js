import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Detail.css'; // css

function UpdateProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: ''
    });

    const handleInput = (event) => {
        setUserData(prev => ({ ...prev, [event.target.name]: event.target.value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí se debe hacer una llamada a la base de datos para actualizar la información del usuario
        axios.post('URL_DEL_BACKEND', userData) // Endpoint para actualizar datos del perfil del usuario
            .then(res => {
                // Manejar la respuesta si es necesario
                console.log(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <section>
            <h2>Update Information</h2>
            <form onSubmit={handleSubmit}>
                <div className='inputbox'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type="text" name="name" value={userData.name} onChange={handleInput} />
                </div>
                <div className='inputbox'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" name="email" value={userData.email} onChange={handleInput} />
                </div>
                <div className='inputbox'>
                    <label htmlFor='actual_area'><strong>Actual Area</strong></label>
                    <input type="text" name="actual_area" value={userData.actual_area} onChange={handleInput} />
                </div>
                <div className='inputbox'>
                    <label htmlFor='interest_areas'><strong>Interest Areas</strong></label>
                    <input type="text" name="interest_area" value={userData.interest_area} onChange={handleInput} />
                </div>
                <div className='inputbox'>
                    <label htmlFor='skills'><strong>Skills</strong></label>
                    <input type="text" name="skills" value={userData.skills} onChange={handleInput} />
                </div>
                <div className='inputbox'>
                    <label htmlFor='user_type'><strong>User Type</strong></label>
                    <input type="text" name="user_type" value={userData.user_type} onChange={handleInput} />
                </div>
                <div>
                    <button type='submit' className='button'>Save</button>
                </div>
                <div>
                    <hr />
                    <div>
                        <Link to="/my-profile" className='link-button'>Back</Link>
                    </div>
                </div>
            </form>
        </section>
    );
}

export default UpdateProfile;