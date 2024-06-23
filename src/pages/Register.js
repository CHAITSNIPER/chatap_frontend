import axios from 'axios';
import { React, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../all.css';
import { UserContext } from '../context/userContext';
import { registerRoute } from '../utils/apiRoutes';

function Register(){
    const navigate = useNavigate();
    const {setUser,setToken} = useContext(UserContext);
    
    const[values,setValues] = useState({
        username : "",
        email:"",
        password: "",
        confirmpass:""
    });
    const[passwords,setPasswords] = useState(true);
    const[userName,ValidUserName] = useState(true);
    const[errortext,setErrortext] = useState(false);
    
    const handleChange=(e)=>{
        let name = e.target.name;
        let value = e.target.value;
        setValues({...values,[name]:value});
    }
    const handleValidation = () => {
        const { username, password, confirmpass } = values;
        let isValid = true;

        if (password !== confirmpass || password.length < 8) {
            setPasswords(false);
            isValid = false;
        } else {
            setPasswords(true);
        }

        if (username.length <= 3) {
            ValidUserName(false);
            isValid = false;
        } else {
            ValidUserName(true);
        }

        return isValid;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if (handleValidation()) {
           
           console.log('validating',registerRoute);
           const {password,confirmpass,username,email} = values;
           
           const {data} = await axios.post(registerRoute,{
            username,
            email,
            password
           });
           if(data.status===false){
               setErrortext(true);
               alert(data.msg);
           }
           if(data.status===true){
            setErrortext(false);
            setUser(username);
            setToken(data.token)
           
            alert('form submitted');
            navigate("/homepage");
           }
        } else {
            alert('Error in form');
        }
    };


    return(
        <>
        <form className="Register_form" onSubmit={(e)=>handleSubmit(e)}>
        <h1>Welcome to Bits Bids</h1>
        <label>UserName: <input type="text" name="username" placeholder="userName" onChange = {(e)=>handleChange(e)}/></label><br></br>
        <div>{!userName && <p style = {{color:'red'}}>invalid userName, either too short or exists already</p>}</div>
        <label>Email ID: <input type="email" name="email" placeholder="mailId" onChange = {(e)=>handleChange(e)}/></label><br></br>
       <label>Password <input type="password" name="password" placeholder="password" onChange = {(e)=>handleChange(e)}/></label><br></br>
        <label>Confirm Password<input type="password" name="confirmpass" placeholder="confirm password" onChange = {(e)=>handleChange(e)}/></label><br></br><br></br>
        <button type="submit">Create User</button><br></br><br></br>
        <span>already Have an account ??<Link className="links" to="/login">login</Link></span>
        </form>
        <div>{errortext && <p style={{color:'red'}}>Did not submit form</p>}</div>
        
        </>

    )
}
export default Register;