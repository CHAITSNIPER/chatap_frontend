import axios from 'axios';
import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../all.css';
import { UserContext } from '../context/userContext';
import { getUserByID } from '../utils/apiRoutes';

const UserProfile = ()=>{
    const { user,token,setUser,setToken } = useContext(UserContext);
    const [values,setValues] = useState({});
    const [email,setEmail] = useState('');
    
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
        if(token){
            localStorage.setItem("token", token);
        }
    }, [user,token]);

    useEffect(()=>{
        const fetchEmail = async()=>{
            console.log('user:',user);
            try {
                const { username,email,password }=values;
                const { data } = await axios.get(getUserByID(user),{
                    headers: {
                        'Authorization':`Bearer ${token}`
                    }
                });
                console.log('data: ',data);
                if (data.status === true) {
                    setEmail(data.user.email);
                }
                else console.log('email error');
            } catch (error) {
                console.error('Error fetching email:', error);
            }
        }
    
       fetchEmail();
    },[user]);

    const handleit = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        navigate('/login');
    }
    
    return(
         <>
        <div className='profileDiv'>
             <button className = "buysellchat" onClick = {(e)=>{navigate('/homepage/buy')}}>buy</button>
            <button className = "buysellchat" onClick = {(e)=>{navigate('/homepage/sell')}}>sell</button>
            <button className = "buysellchat" onClick = {(e)=>{navigate('/homepage/chat')}}>chat</button>
            <h1>User Profile</h1>
             <p>UserName: {user}</p>
            <p>EmailId: {email}</p>
        </div>
        <div className = 'lout'><button className = 'logout' onClick={handleit}>Log out</button></div>
        </>
    )
}

export default UserProfile;