import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  
  const [users,setUsers] = useState([]);
  const [email,setEmail] = useState('');
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchUsers();
  },[])

  const fetchUsers = () => {
    axios
    .get('http://localhost:30001/register')
    .then((res) => {
      console.log(res.data)
    })
  }

  const handleRegister = (event) => {
    event.preventDefault();

    console.log("Here");
    axios
    .post('http://localhost:3001/register',{email,username,password})
    .then(() => {
      alert('Registration successfully')
      setEmail('')
      setUserName('')
      setPassword('')
      fetchUsers()
      navigate('/login')
    })
    .catch((error) => {
      console.log('Unable tp register user')
    })
  }

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[50%] h-[100%] bg-[#1a1a1a]/90 text-white justify-center items-center'>

        <form className='text-center border rounded-lg w-[600px] h-[400px] p-9 mt-[20%] ml-[5%]' onSubmit={handleRegister}>

          <label>Email</label>
          <br/>
          <input className='w-[400px] rounded-xl bg-zinc-700 p-2' type='text' placeholder='Ente your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
          <br/>
          <br/> 

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
            SignUp
          </button>

        </form>

      </div>

      <div className='w-[50%] h-[100%] felx  bg-teal-800'>
        <h3 className='text-3xl text-white justify-center'>SIGN UP</h3>
      </div>
    </div>
  )
}