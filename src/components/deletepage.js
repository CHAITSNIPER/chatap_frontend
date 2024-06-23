import axios from 'axios';
import React, { useContext } from 'react';
import '../all.css';
import { UserContext } from '../context/userContext';
import { DeleteRoute } from '../utils/apiRoutes';


export default function Deletepage() {
    const { token, user } = useContext(UserContext);
   const handleClick = async()=>{
    try{
      const response = await axios.delete(DeleteRoute,{
        headers:{
            'Authorization':`Bearer ${token}`
        }
      });
   }catch(error){
    console.log(error);
   }
   }

   
  return (
    <div>
       <button className='AdminDeletes' onClick={handleClick}>Delete all Items</button>
    </div>
  )
}
