import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './../../styles/Detail.css'; // css

function MyProfile() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: ''
    });

    useEffect(() => {
        axios.get('URL_DEL_BACKEND') // Endpoint para obtener datos del perfil del usuario
            .then(res => {
                setUserData(res.data);})
            .catch(err => console.log(err));}, []);

    return (
        <section>
            <h2>My Profile</h2>
            <div className='inputbox'>
                <label htmlFor='name'><strong>Name</strong></label>
                <input type="text" value={userData.name} readOnly /></div>
            <div className='inputbox'>
                <label htmlFor='email'><strong>Email</strong></label>
                <input type="email" value={userData.email} readOnly /></div>
            <div className='inputbox'>
                <label htmlFor='actual_area'><strong>Actual Area</strong></label>
                <input type="text" value={userData.actual_area} readOnly /></div>
            <div className='inputbox'>
                <label htmlFor='interest_areas'><strong>Interest Areas</strong></label>
                <input type="text" value={userData.interest_area} readOnly /></div>
            <div className='inputbox'>
                <label htmlFor='skills'><strong>Skills</strong></label>
                <input type="text" value={userData.skills} readOnly />
            </div><div className='inputbox'>
                <label htmlFor='user_type'><strong>User Type</strong></label>
                <input type="text" value={userData.user_type} readOnly /></div>
            <div>
                <Link to="/update-profile" className='button'>Update Information</Link></div>
        </section>
    );
}

export default MyProfile;