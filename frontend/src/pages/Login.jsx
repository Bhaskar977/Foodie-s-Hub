import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [credentials,setCredentials] = useState({
    email:"",password:""
  })
  const navigate = useNavigate();

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const response = await fetch("http://localhost:8000/api/loginuser",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:credentials.email,
        password:credentials.password
      })
    })

    const json = await response.json()
    if(json.success){
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken)
      navigate("/")
    }
    if(!json.success){
      alert("Enter valid credentials")
    }
  }

  const handleChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
  }

  return (
    <div className='container mt-3'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-6">
            <input type="text" className="form-control" name="email" value={credentials.email} id="staticEmail" onChange={handleChange} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
          <div className="col-sm-6">
            <input type="password" className="form-control" name="password" value={credentials.password} id="inputPassword" onChange={handleChange} />
          </div>
        </div>
        <button type='submit' className='btn btn-success'>Login</button>
        <Link to="/signup" className='m-3 btn btn-dark'>New user</Link>
      </form>
    </div>
  )
}

export default Login