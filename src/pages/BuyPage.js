import axios from 'axios';
import { React, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../all.css";
import Deletepage from '../components/deletepage';
import profile from '../components/profile.png';
import { UserContext } from '../context/userContext';
import { ValidateAdmin, getProductDetails, getSelected, sellRoute } from '../utils/apiRoutes';

function BuyPage(){
    const [items,addItems] = useState([]);
    const { user,token } = useContext(UserContext);
    const [isAdmin,setIsAdmin] = useState(false);
    const [search,setSearch] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchItem = async()=>{
            try{
            const response  = await axios.get(sellRoute,{
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            console.log(response.data.status);
            if(response.data.status){
                addItems(() => {
                    console.log("State is being set with items:", response.data.items);
                    return response.data.items;
                });
            }
            else{
                console.log('response not added');
            }
        }catch(error){
            console.log(error);
        }
        
    }

    fetchItem();
},[])

    useEffect(() => {
        console.log("Items state updated:", items);
    }, [items]);
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        }
    }, [user]);

    useEffect(() => {
        if (!user) {
            navigate('/login'); // Redirect to login if user is not authenticated
        }
    }, [user, navigate]);
    


    const goToProduct = async(itemID)=>{
        try{
        const response  = await axios.get(getProductDetails(itemID),{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });

        if(response){
            console.log(response.data);
            navigate(`/homepage/buy/${itemID}`);
        }
        else{
            console.log('undefined data');
        }

        }catch(error){
            console.log('error ',error);
        }
    }

    const handleit = (e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setSearch(value);
    }

    const handleSearch = async()=>{
        try{
            const response  = await axios.get(getSelected(search));
            if(response){
                addItems(response.data.item);
                console.log(response.data.item);
            }
        }catch(error){
            console.error('error ',error);
        }
    }
    const renderedItems = [];
for (let i = 0; i < items.length; i++) {
    const item = items[i];
    renderedItems.push(
        <li key={item._id}>
            <button onClick={() => goToProduct(item._id)} className='butto'>
                Uploaded by <nav className="wee">{item.username}</nav>---{item.name}: ${item.cost}
                <img className='images' src={item.image} alt={item.name}/>
            </button>
            {i % 3 === 0 ? <br /> : ' '}
        </li>
    );
}

   const validateAdmin = async()=>{
       try{
        const response = await axios.get(ValidateAdmin(user),{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        console.log(response.data);
         setIsAdmin(response.data.status);
         return response.data.status;
       }catch(error){
        console.log('error',error);
       }
   }

   useEffect(()=>{
     validateAdmin();
   },[])
    return(
        <>
        {isAdmin ? <Deletepage/> : <div></div>}
        <button className = "profile" onClick = {(e)=>navigate('/homepage/user')}><img src = {profile}></img><br></br> your profile</button>
        <button className = 'toggle'onClick={(e)=>{navigate('/homepage/sell')}}>SellPage</button>
        
        <div className = "Products">
            <h1>Hello {user}! here are the products for you</h1>
            <div className = "bars">
            <input type = "text" name = "search" value = {search} placeholder = 'Type to search' onChange = {(e)=>handleit(e)}/>
            <button onClick = {()=>handleSearch()}>Search</button>
            </div>
           <span className = "product">
           <ul>
                    {items.length === 0 ? (
                        <li>No items available</li>
                    ) : (
                        <ul className='unordered'>{renderedItems}</ul>
                    )
                    
                    }
                </ul>
           </span>
        </div>
        </>
    )
}
export default BuyPage;