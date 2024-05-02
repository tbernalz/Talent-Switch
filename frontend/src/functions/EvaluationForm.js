import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './../css/Detail.css'; // CSS
import './../css/profile.css';

function EvaluationForm() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const handleRatingChange = (event) => {
        setRating(parseInt(event.target.value));
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Rating:', rating);
        console.log('Comment:', comment);
        //logica para enviar los datos a la base de datos
    };

    return (
        <section className="opportunity-detail">
            <h2>Evaluation Form</h2>
            <form onSubmit={handleSubmit}>
                <div className='inputbox'>
                    <label htmlFor='rating'><strong>Rating:</strong></label>
                    <select id='rating' name='rating'
                    value={rating} className={'form-control rounded-0'} onChange={handleRatingChange}>
                        <option value='1'>1 Star</option>
                        <option value='2'>2 Stars</option>
                        <option value='3'>3 Stars</option>
                        <option value='4'>4 Stars</option>
                        <option value='5'>5 Stars</option>
                    </select>
                </div>
                <div>
                    <label className  htmlFor='comment'><strong>Comment:</strong></label>
                    <div>
                        <textarea
                            id='comment'
                            value={comment}
                            onChange={handleCommentChange}
                            rows='4'
                        />
                    </div>
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <hr />
            <div>
                <Link to="/home" className='link'>Back</Link>        
            </div>
        </section>
    );
}

export default EvaluationForm;