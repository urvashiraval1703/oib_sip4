import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [users,setUsers] = useState([])
    const [username,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
      },[])
    
      const fetchUsers = () => {
        axios
        .get('http://localhost:3001/register')
        .then((res) => {
          console.log(res.data)
        })
      }

      const handleLogin = async(event) => {
        event.preventDefault();

        try{
            const response = await axios.post('http://localhost:3001/login',{username,password})
            const token = response.data.token
            alert('Login Successfully')
            setUserName('')
            setPassword('')
            fetchUsers();
            navigate('/account')
            window.location.reload()
            localStorage.setItem('token',token)
        }catch(err)
        {
            console.log("Login Error")
        }
      }

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[50%] h-[100%] bg-[#1a1a1a]/90 text-white justify-center items-center'>

        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9 mt-[20%] ml-[5%]' onSubmit={handleLogin}>

          <label>UserName</label>
          <br/>
          <input className='w-[400px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Ente your UserName' value={username} onChange={(e) => setUserName(e.target.value)}/>
          <br/>
          <br/> 

          <label>Password</label>
          <br/>
          <input className='w-[400px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Ente your Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          <br/>
          <br/> 

          <button className='w-[200px] h-[50px] border hover:bg-teal-900' type='submit'>
            Login
          </button>

        </form>

      </div>

      <div className='w-[50%] h-[100%] felx justify-center items-center bg-teal-800'>
        <h3 className='text-3xl text-white'>LOGIN</h3>
      </div>
    </div>
  )
}