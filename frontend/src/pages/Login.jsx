import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {

    const [user, setUser] = useState({
        username:"",
        password:""
    })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser(prev=>({...prev, [e.target.name]: e.target.value}))
    }

    const handleClick = async (e) => {
        e.preventDefault()
        try {
            axios.post("http://localhost:8800/login", user).then(res => {
                if(res.data[0].Role == 'Customer'){
                    navigate("/customer", {state : {
                        AccountNumber: res.data[0].AccountNumber,
                        AvailableBalance: res.data[0].AvailableBalance,
                        Id: res.data[0].Id,
                        Role: res.data[0].Role,
                        Username: res.data[0].Username }});
                }
                else{
                    navigate("/banker", {state : {
                        AccountNumber: res.data[0].AccountNumber,
                        AvailableBalance: res.data[0].AvailableBalance,
                        Id: res.data[0].Id,
                        Role: res.data[0].Role,
                        Username: res.data[0].Username }});
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center mt-5 w-1/2 bg-indigo'>
                <h1 className='text-3xl font-extrabold'>Login</h1>
                <input className='mt-5 w-full' type="text" placeholder='Enter your username' onChange={handleChange} name='username'/>
                <input className='mt-5 w-full' type="password" placeholder='Enter your password' onChange={handleChange} name='password'/>
                <button className='mt-5 bg-indigo-600 h-10 w-full' onClick={handleClick}>Login</button>
            </div>
        </div>
    )
}

export default Login