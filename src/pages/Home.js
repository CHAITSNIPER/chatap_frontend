import React from 'react';
import { Link } from 'react-router-dom';
import '../all.css';

function Home(){

    return(
        <>
        <div className='homelink'>
            <h1>Welcome To Storey</h1>
        <Link className='links' to = '/login'>Login </Link>
        <Link className='links' to =  '/register'>Register</Link>
        </div>
        </>
    )
}

export default Home;