import axios from 'axios';
import { React, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { getProductDetails } from '../utils/apiRoutes';

function Product(){
    const navigate = useNavigate();
    const { _id } = useParams();
    const { token,user } = useContext(UserContext);
    const [value,setValue] = useState({
        username:"",
        name:"",
        cost:0,
        image: null
    })

    const goToProduct = async(itemID)=>{
        try{
        const response  = await axios.get(getProductDetails(itemID),{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });

        if(response){
            console.log(response.data);
            setValue(response.data.item);
        }
        else{
            console.log('undefined data');
        }

        }catch(error){
            console.log('error ',error);
        }
    }

    useEffect(()=>{
        goToProduct(_id);
    },[]);
    return(
        <>
        <button className = 'back' onClick={()=>{navigate('/homepage/buy')}}>Go Back</button>
        <div className = 'products'>
        UserName:<span className="you"> {value.username}</span> <br></br>
       Name:  <span className="you">{value.name}</span> <br></br>
       Cost:  <span className="you">{value.cost}$</span> <br></br>
       <img src = {value.image} alt={value.name}/>
        </div>
        </>
    )
}
export default Product;