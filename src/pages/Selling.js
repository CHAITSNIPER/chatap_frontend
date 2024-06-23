import axios from 'axios';
import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import profile from '../components/profile.png';
import { UserContext } from '../context/userContext';
import { addUserItem } from '../utils/apiRoutes';

function Selling(){
    const navigate = useNavigate();
    const { user,token } = useContext(UserContext);
    const [inputs,setInputs]=useState({
        name:"",
        cost:0,
        image: null
    });
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);
    const handleValidation=()=>{
        const { cost, name,image } = inputs;
        if(!user) return false;
        if(name==="") return false;
        if(cost <= 0) return false;
        if (!image) return false; 
        return true;
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(inputs);
        if (handleValidation()) {
            const { name, cost, image } = inputs;
            const username = user;
        
            try {
                const response = await axios.post(addUserItem, {
                    username,
                    name,
                    cost,
                    image
                },{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
                });
        
                console.log('Response:', response.data); // Add this line to log the response
        
                if (response.data.status === true) {
                    alert('Data added successfully');
                } else {
                    alert('Form invalid');
                }
            } catch (error) {
                console.error('Error adding item:', error);
                alert('An error occurred while adding the item.');
            }
        }
    }
    const handleChange=async(e)=>{
        const name = e.target.name;
        let value = e.target.value;

        if(name==="image"){
            const file=e.target.files[0];
            const base64string = await convertToBase64(file);
            value = base64string;
        }
        setInputs({...inputs,[name]:value});
    }

    const convertToBase64=(file)=>{
        return new Promise((resolve,reject)=>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload=()=>{
                resolve(fileReader.result);
            }
            fileReader.onerror=(error)=>{
                reject(error);
            }
        })
    }
    return(
        <>
        <button className = "profile" onClick = {(e)=>navigate('/homepage/user')}><img src = {profile}></img><br></br> your profile</button>
        <button className = 'toggle'onClick={(e)=>{navigate('/homepage/buy')}}>BuyPage</button>
        <form onSubmit = {(e)=>handleSubmit(e)}>
            <h1>Hello {user}, what do you plan on selling?</h1>
          <label>Item Name: </label>  <input type="text" name="name" onChange={(e)=>{handleChange(e)}}/><br></br><br></br>
           <label>Cost you want to sell:  </label> <input type = "number" name = "cost" onChange = {(e)=>{handleChange(e)}}/><br></br><br></br>
           <label>Upload Image:</label> <input type="file" name="image" onChange={(e)=>{handleChange(e)}} accept=".jpg,.jpeg,.png"/><br></br><br></br>
            <button type="submit">Sell</button>
        </form>
        </>
    )
}
export default Selling;