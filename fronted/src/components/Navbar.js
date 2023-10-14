import React from 'react'
import {Link,useNavigate} from 'react-router-dom'

export default function Navbar() {

    const isUserSignedIn = !!localStorage.getItem('token')
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
  return (
    <nav className='flex justify-around p-3 border-b border-zinc-800 items-center bg-[#1a1a1a]/90 text-zinc-300'>
        <Link to ="/"><h1 className='text-3xl'>AuthDB</h1></Link>

        <ul className='flex gap-6'>

        {isUserSignedIn ? (
                    
                    <>
                        <Link to='/account'><li>Account</li></Link>
                        <li><button onClick={handleSignOut}>
                            SignOut
                        </button></li>
                    </>
                ) : (
    
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">SignUp</Link>
                    </>
                )}
            
        </ul>
    </nav>
  )
}



