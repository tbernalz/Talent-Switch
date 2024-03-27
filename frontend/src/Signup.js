import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignUpValidation';
import axios from 'axios';

function Signup() {
    
    const [values, setValues] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type:'',
        password: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if(errors.name === "" && errors.email === "" 
        && errors.actual_area === "" && errors.interest_area === ""
        && errors.skills === "" && errors.user_type === ""
        && errors.password === ""){
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                navigate('/');
            })
            .catch(err => console.log(err));
        }
    }
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign Up</h2>
            <form  action='' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type="text" placeholder='Enter your Name' name='name'
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>
                
                <div className='mb-3'>
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter your Email' name='email'
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='actual_area'><strong>Actual Area</strong></label>
                    <input type="text" placeholder='Enter your Actual Area' name='actual_area'
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.actual_area && <span className='text-danger'> {errors.actual_area}</span>}
                </div>
                
                {/* campos que pueden ser por agregación de items : Posibles Mejoras*/}
                <div className='mb-3'>
                    <label htmlFor='interest_areas'><strong>Interest Areas</strong></label>
                    <input type="text" placeholder='Enter your Interest Areas' name='interest_area'
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.interest_area && <span className='text-danger'> {errors.interest_area}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='skills'><strong>Skills</strong></label>
                    <input type="text" placeholder='Enter your Interest Areas' name='skills'
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.skills && <span className='text-danger'> {errors.skills}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='user_type'><strong>User Type</strong></label>
                    <select id="user_type" name='user_type'
                    onChange={handleInput} className='form-control rounded-0'>
                        <option value="" disabled selected>Choose your type of user</option>
                        <option value="leader">Leader</option>
                        <option value="employee">Employee</option>
                    </select>
                    {errors.user_type && <span className='text-danger'> {errors.user_type}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter a Password' name='password'
                    onChange={handleInput} className='form-control rounded-0' />
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                
                <button type='submit' className='btn btn-success w-100 rounded-100'> Sign Up</button>
                <p>You are agree to our terms and policies.</p>
                <Link to="/" className='btn btn-default border w-100 bg-light rounded-100 decoration-none'>Log In</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup