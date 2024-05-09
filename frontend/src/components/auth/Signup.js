import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from '../../utils/validations/SignupValidation';
import axios from 'axios';
import './../../styles/profile.css'; // css

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        actual_area: '',
        interest_area: '',
        skills: '',
        user_type: '',
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
        if(
            errors.name === "" &&
            errors.email === "" &&
            errors.actual_area === "" &&
            errors.interest_area === "" &&
            errors.skills === "" &&
            errors.user_type === "" &&
            errors.password === ""
         ){
            axios.post('http://localhost:8081/signup', values)
            .then(res => {
                if(res.data === "Success"){

                    // por ahora alert
                    alert('User was Successfully registered')
                    navigate('/');
                }else if(res.data === "email_exists"){
                    alert("Email Already Exists");
                }else{
                    alert("An Error has Cccurred")
                }

            })
            .catch(err => console.log(err));
        }
    }
  return (
    <section>
        <form  action='' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>

                <div className='inputbox'>
                    {/* <ion-icon name=''></ion-icon> */}
                    <label htmlFor='name'><strong>Name</strong></label>
                    <input type="text" placeholder='Enter your Name' name='name'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.name ? ' is-invalid' : '')}/>
                    {errors.name && <span className='text-danger'> {errors.name}</span>}
                </div>

                <div className='inputbox'>
                    {/* <ion-icon name=''></ion-icon> */}
                    <label htmlFor='email'><strong>Email</strong></label>
                    <input type="email" placeholder='Enter your Email' name='email'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.email ? ' is-invalid' : '')}/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>

                <div className='inputbox'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='actual_area'><strong>Actual Area</strong></label>
                    <input type="text" placeholder='Enter your Actual Area' name='actual_area'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.actual_area ? ' is-invalid' : '')}/>
                    {errors.actual_area && <span className='text-danger'> {errors.actual_area}</span>}
                </div>

                {/* campos que pueden ser por agregación de items : Posibles Mejoras*/}

                <div className='inputbox'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='interest_areas'><strong>Interest Areas</strong></label>
                    <input type="text" placeholder='Enter your Interest Areas' name='interest_area'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.interest_area ? ' is-invalid' : '')}/>
                    {errors.interest_area && <span className='text-danger'> {errors.interest_area}</span>}
                </div>

                <div className='inputbox'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='skills'><strong>Skills</strong></label>
                    <input type="text" placeholder='Enter your Skills' name='skills'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.skills ? ' is-invalid' : '')}/>
                    {errors.skills && <span className='text-danger'> {errors.skills}</span>}
                </div>

                {/* ---------------------------------------------- */}

                <div className='inputbox - select-container'>
                    {/* <ion-icon name=''></ion-icon>    */}
                    <label htmlFor='user_type'><strong>User Type</strong></label>
                    <select id="user_type" name='user_type'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.description ? ' is-invalid' : '')}>
                        <option value="" disabled selected>Choose your type of user</option>
                        <option value="leader">Leader</option>
                        <option value="employee">Employee</option>
                    </select>
                    {errors.user_type && <span className='text-danger'> {errors.user_type}</span>}
                </div>

                <div className='inputbox'>
                    <ion-icon name= 'locked-closed-outline'></ion-icon>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type="password" placeholder='Enter a Password' name='password'
                    onChange={handleInput} className={'form-control rounded-0' + (errors.password ? ' is-invalid' : '')}/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <div>
                <button type='submit' className='button'> Sign Up</button>
                </div>
                <div>
                    <hr/>
                    <p>You agree to our terms and policies.</p>
                    <div>
                    <Link to="/" className='link-button'>Log In</Link>
                    </div>
                </div>
            </form>
    </section>
  )
}

export default Signup