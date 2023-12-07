import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const {signUpRequest, isLoading, error} = useSignup()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signUpRequest(name, email, password)
    }

    return (
        <form className='signup' onSubmit={handleSubmit}> 
            <h3>Sign Up</h3>
            
            
            <label>Name:</label>
            <input
                type="text"
                onChange={(e)=>setName(e.target.value)}
                value={name}
            />
            
            
            <label>Email:</label>
            <input
                type="email"
                onChange={(e)=>setEmail(e.target.value)}
                value={email}
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
            />

            <button disabled={isLoading}>Sign Up</button>
            {error && <div className='error'>{error}</div>}
        </form>
    );

}

export default Signup