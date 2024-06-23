import axios from 'axios';
import { React, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { loginRoute } from '../utils/apiRoutes';

function Login(){
    const navigate = useNavigate();
    const { setUser,setToken } = useContext(UserContext);
    
    const [inputs,setInputs]=useState({
        username:"",
        password:""
    });
    const [errortext,setErrortext]=useState(false);
    const [display,setDisplayText] = useState('');
    

    const handleChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setInputs({...inputs,[name]:value});
    }
    const handleValidation=()=>{
        const { password, username } = inputs;
        if(password===""){
            return false;
        }
        if(username ===""){
            return false;
        }
        return true;
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(handleValidation()){
        const {username,password} = inputs;

        const {data}= await axios.post(loginRoute,{
            username,
            password
        });
        if(data.status===false){
            setErrortext(true);
            alert('form not submitted');
            setDisplayText(data.msg);
        }
        if(data.status===true){
         setErrortext(false);
         alert('Login SuccessFul');
         setUser(username);
         setToken(data.token);
         navigate("/homepage");
         setDisplayText('');
        }
    }else{
        alert('error fetching')
    }

}
    return(
        <>
        <form onSubmit={handleSubmit}>
        <h1>Welcome to Bits Bids</h1>
           <label>Username: <input type="text" name = "username" placeholder='username' onChange = {(e)=>handleChange(e)}/></label><br></br>
           <label>Password: <input type="password" name = "password" placeholder='password' onChange = {(e)=>handleChange(e)}/></label><br></br><br></br>
          <label><button type="submit">Login</button></label> <br></br><br></br>
           <span>New here? <Link className="links" to="/register">Create new User</Link></span><br></br>
           Forgot Password? <Link className="forgotPassword" to = '/forgotPassword'>Click Here</Link>
           <div>{errortext && <p style ={{color:'red'}}>{display}</p>}</div>
        </form>
        </>
    )
}
export default Login;