import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {

    const [credentials, setCrendentials] = useState({
        name: "",
        email: "",
        password: "",
        geolocation: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log( JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
            location: credentials.geolocation
        }))
        const response = await fetch("http://localhost:8000/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        })
        const json = await response.json()
        console.log(json)
        if (!json.success) {
            alert("Enter valid credentials")
        }
    }

    const handleChange = (e) => {
        setCrendentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container mt-3'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 row">
                    <label htmlFor="static" className="col-sm-2 col-form-label">Name</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" name="name" value={credentials.name} id="name" onChange={handleChange} />
                    </div>
                </div>
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
                <div className="mb-3 row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">location</label>
                    <div className="col-sm-6">
                        <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} id="address" onChange={handleChange} />
                    </div>
                </div>
                <button type='submit' className='btn btn-success'>Submit</button>
                <Link to="/login" className='m-3 btn btn-dark'>Already a user</Link>
            </form>
        </div>
    )
}

export default SignUp