import React, { useEffect, useState } from 'react'
import {FiMail} from "react-icons/fi"
import {RiLockPasswordLine} from "react-icons/ri"
import "../RegisterPage/RegisterPage.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useUser } from '../../context/UserContext';


const Login = () => {
    const navigate =useNavigate()
    const [error,setError] =useState({})
    const [submit,setSubmit] =useState(false)
    const { setUserData } = useUser();

    const [data,setData] =useState({
        username:"",
        password:"",
    })

    const handleChange=(e)=>{
        const newObj={...data,[e.target.name]:e.target.value}
        setData(newObj)
    }
 

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError(validationLogin(data));
        setSubmit(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login', data);
            if (response.status === 200) {
                console.log('login successful!');
               // console.log(response.data.user);      
                setUserData(response.data.user);
                localStorage.setItem('userData', JSON.stringify(response.data.user));
                //const userData = JSON.stringify(response.data.user);
                //navigate(`/home?userData=${userData}`);
                navigate(`/home`);


            }else{
                console.log("guru");
            }
        } catch (error) {
            console.error('Failed to login:', error.message);
        }
    };


   function validationLogin(data){
        const error ={}

        // const emailPattern= /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        const passwordPattern= /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{1,12}$/g;

        // if(data.email === ""){
        //     error.email ="* Email is Required"
        // }
        // else if(!emailPattern.test(data.email)){
        //     error.email="* Email did not match"
        // }

        
        if(data.password === ""){
            error.password = "* Password is Required"
        }
        else if(!passwordPattern.test(data.password)){
            error.password="* Password not valid"
        }
        
        return error
   }



  return (
    <div className="container_log">
        <div className="container-form">
            <form onSubmit={handleSignUp}>
                <h1>Login</h1>
                <p>Please sign in to continue.</p>
                <div className="inputBox">
                    <FiMail className='mail'/>
                    <input type="text" 
                            name="username" 
                            id="username" 
                            onChange={handleChange}
                            placeholder='Username'/> 
                </div>
                {error.username && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.username}</span>}

                <div className="inputBox">
                    <RiLockPasswordLine className='password'/>
                    <input type="password" 
                            name="password" 
                            id="password" 
                            onChange={handleChange}
                            placeholder='Password'/>
                </div>
                {error.password && <span style={{color:"red",display:"block",marginTop:"5px"}}>{error.password}</span>}
               

                <div className='divBtn'>
                    <small className='FG'>Forgot Password?</small>
                    <button type='submit' className='loginBtn'>LOGIN</button>
                </div>
                
            </form>

            <div className='dont'>
                <p>Don't have an account? <Link to="/signup"><span>Sign up</span></Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login