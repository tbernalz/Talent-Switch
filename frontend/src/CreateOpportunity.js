import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './validations/CreateOpportunityValidation';
import axios from 'axios';
import './css/profile.css'; // css

function CreateOpportunity() {
    const [values, setValues] = useState({
        opportunity_name: '',
        leader_user_id: '',
        opportunity_area: '',
        description: '',
        required_skills: '',
        start_date: '',
        final_date: ''
    })

    const navigate = useNavigate();
    const [errors, setErrors] = useState({})    
    const handleInput = (event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

        if (new Date(values.start_date) > new Date(values.final_date)) {
            const newErrors = { ...errors, final_date: 'Final date cannot be earlier than start date' };
            setErrors(newErrors);
            return;
        }

        if (
            !errors.opportunity_name &&
            !errors.leader_user_id &&
            !errors.opportunity_area &&
            !errors.description &&
            !errors.required_skills &&
            !errors.start_date &&
            !errors.final_date
        ) {
            axios.post('http://localhost:8081/create-opportunity', values)
                .then(res => {
                    if(res.data === "Success"){
                    
                        //por ahora alert
                        alert('Opportunity was created');
                        navigate('/home');
                    }else {
                        alert("It was not possible to create the opportunity");
                        navigate('/home');
                    }
                })
                .catch(err => console.log(err));
        }
    }


  return (
    <section>
        <form  action='' onSubmit={handleSubmit}>
            <h2>Create Opportunity</h2>

            <div className='inputbox'>
                <label htmlFor='opportunity_name'><strong>Opportunity Name</strong></label>
                <input type="text" placeholder='Enter Opportunity Name' name='opportunity_name'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.opportunity_name && <span className='text-danger'> {errors.opportunity_name}</span>}
            </div>

            <div className='inputbox'>
                {/* Pensar cambiar por no mostrar */}
                <label htmlFor='leader_user_id'><strong>Leader User ID</strong></label>
                <input type="text" placeholder='Enter Leader User ID' name='leader_user_id'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.leader_user_id && <span className='text-danger'> {errors.leader_user_id}</span>}
            </div>

            <div className='inputbox'>
                <label htmlFor='opportunity_area'><strong>Opportunity Area</strong></label>
                <input type="text" placeholder='Enter Opportunity Area' name='opportunity_area'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.opportunity_area && <span className='text-danger'> {errors.opportunity_area}</span>}
            </div>

            <div className='inputbox'>
                <label htmlFor='description'><strong>Description</strong></label>
                <input type="text" placeholder='Enter Description' name='description'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.description && <span className='text-danger'> {errors.description}</span>}
            </div>

            <div className='inputbox'>
                <label htmlFor='required_skills'><strong>Required Skills</strong></label>
                <input type="text" placeholder='Enter Required Skills' name='required_skills'
                onChange={handleInput} className='form-control rounded-0' />
                {errors.required_skills && <span className='text-danger'> {errors.required_skills}</span>}
            </div>

            <div className='inputbox'>
                <label htmlFor='start_date'><strong>Start Date</strong></label>
                <input type="date" name="start_date" onChange={handleInput} className='form-control rounded-0' />
                {errors.start_date && <span className='text-danger'> {errors.start_date}</span>}
            </div>

            <div className='inputbox'>
                <label htmlFor='final_date'><strong>Final Date</strong></label>
                <input type="date" name="final_date" onChange={handleInput} className='form-control rounded-0' />
                {errors.final_date && <span className='text-danger'> {errors.final_date}</span>}
            </div>

            <div>
                <button type='submit' className='button'>Create</button>    
            </div>
            <div>
                <hr/>
                <div>
                    <Link to="/home" className='link'>Back</Link>        
                </div>
            </div>
        </form>
        <div className='text'>Magneto07</div>
    </section>
  );
}

export default CreateOpportunity;