import { React, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';



function Homepage(){
    const { user } = useContext(UserContext);
    const { token } = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(()=>{
        if(user){
       localStorage.setItem("user",JSON.stringify(user));
        }
        else{
            navigate('/login');
        }
    },[user,navigate]);

    const handleClick=(e)=>{
        const value = e.target.value;
        if(value === "buy"){
          console.log('buypage');
          navigate('/homepage/buy');
        }
        else if(value==="sell"){
            console.log('sell');
            navigate('/homepage/sell');
        }
        else if(value==="chat"){
            console.log('chat');
            navigate('/homepage/chat');
        }
    }

    if(!user) return null;
    return(
        <>
        {user.length > 0 && (
              <div className='buyme'>
              <h1>Hello {user}</h1>
          <h1>Are you here for</h1>
          <button className="op1" value="buy" onClick={(e)=>handleClick(e)}>Buying</button>
          <button className="op1" value="sell" onClick={(e)=>handleClick(e)}>Selling</button>
          <button className = "op1" value="chat" onClick={(e)=>handleClick(e)}>Chatting</button>
          </div>
        )}
       
    </>
    )
}
export default Homepage;
