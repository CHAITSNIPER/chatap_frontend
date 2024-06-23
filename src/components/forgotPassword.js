import axios from 'axios';
import React, { useState } from 'react';
import { ForgotPasswordRoute } from '../utils/apiRoutes';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [text,setText] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

       
        try{
            const response = await axios.post(ForgotPasswordRoute,{
                email,
            })

            if(response.data){
                console.log(response.data);
                setText(`you have recieved an email at ${email}`);
            }
        }catch(error){
            console.log('error',error);
        }
       
    };

    return (
        <div>
            
            <form onSubmit={handleSubmit}>
            <h1>Forgot Password</h1>
                <label >Please Enter your email:  </label>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    required 
                /><br></br><br></br>
                <button type="submit">Submit</button>

                <p>{text}</p>
            </form>
        </div>
    );
}

export default ForgotPassword;


