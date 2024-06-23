import axios from 'axios';
import { React, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../all.css';
import profile from '../components/profile.png';
import { UserContext } from '../context/userContext';
import { allUsersRoute, getMessages, host, sendMessageRoute } from '../utils/apiRoutes';

function Chat(){
    const socket = useRef();
   const { user,token } = useContext(UserContext);
   const  [values,setValues] = useState([]);
   const [selectedUser,setSelectedUser] = useState(null);
   const [message, setMessage] = useState('');
   const [chats,setChats] = useState([]);
   const [arrivalMessage,setArrivalMessage]=useState(null);
   const navigate = useNavigate();   

   useEffect(()=>{
    if(user){
        socket.current = io(host);
        socket.current.emit("add-user",user);
    }
   })


   useEffect(()=>{
    const fetchUsers = async()=>{
        const {data} = await axios.get(allUsersRoute(user));
        if(data != null){
            setValues(data);
        }
    }
    fetchUsers();
   },[user]);

   const handleClick = (u)=>{
         setSelectedUser(u);
   }
   const handleChange = (e)=>{
        const value = e.target.value;
        setMessage(value);
   }

   const handleSends = async()=>{
    try{
     const { data } = await axios.post(sendMessageRoute,{
        from : user,
        to: selectedUser.username,
        message: message
     },{
        headers:{
            'Authorization': `Bearer ${token}`
        }
     })
     console.log('Data sent:',data);

     setChats((chats)=>[
        ...chats,{
              fromSelf:true,
              message:message,
        }
     ]);
     

     
     socket.current.emit("send-msg",{
        to: selectedUser.username,
        from: user,
        message:message
     })
     

     setMessage('');

    }catch(error){
        console.log('error:  ',error);
    }
   }

   useEffect(()=>{
    if(socket.current){
        socket.current.on("msg-recieve",(msg)=>{
            setArrivalMessage({fromSelf:false,message:msg});
        })
    }
},[user]);

    useEffect(()=>{
        arrivalMessage && setChats((prev)=>
            [...prev,arrivalMessage]
        );
    },[arrivalMessage])

   const fetchData = async()=>{
        
    const { data: response } = await axios.post(getMessages,{
        from:user,
        to:selectedUser.username,
    },{
        headers:{
            'Authorization':`Bearer ${token}`
        }
    });
    if(response){
    console.log(response.projectMessages);
    setChats(response.projectMessages);  
    }
    
    else{
        console.log(response);
        console.log('no response');
    }
}
useEffect(()=>{
    if(selectedUser)
    fetchData();
},[selectedUser]);
   
  return(
    <>
    <h1 className="chatHead">Hello {user}</h1>
    <button className = "profile" onClick = {(e)=>navigate('/homepage/user')}><img src = {profile}></img><br></br> your profile</button>
    <div className = 'users_window'>
        <br></br>
        <section class="usersList">
            <nav>Chat!</nav>
            <div className="scroll">
            {values.map((u, index) => (<>
               <button className = 'TextButtons' onClick={()=>handleClick(u)}> <div key={index}>
                    <p>{u.username}</p>
                    <p>{u.email}</p>
                   </div>
                   </button>
                   <br></br>
                   </>
        ))}</div></section>
       </div>
    

    {selectedUser && (
        <div className='chatwindow'><span className="heading">{selectedUser.username}</span>
        <div className = "inputChat"><input type="text" className='inputss' value = {message} placeHolder='type message' onChange = {(e)=>handleChange(e)}/>
        <button className='v' onClick = {handleSends}>Send</button></div>
        <div className='messageWindow'>
        <div className="scrolly">
          { Array.isArray(chats)&&
            chats.map((message,index)=>{
               return(
                
                <div key = {index} className = {`message ${message.fromSelf?'sent':'recieved'}`}>
                    <div className="content">
                       {message.message}
                    </div>
                </div>
                
               )
            })
        }
         </div>  
        </div>
        </div>
    )}
    </>
   )
}
export default Chat;