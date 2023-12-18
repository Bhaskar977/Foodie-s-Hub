import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Modal';
import Cart from './Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {
    const navigate = useNavigate();
    const data = useCart();
    const [cartView, setCartView] = useState(false)
    console.log(cartView, "cartView")

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        navigate("/login")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand" href="/">Foodie's Hub</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mx-1">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        {
                            localStorage.getItem("authToken") ?
                                (
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="/myorder">My Orders</Link>
                                    </li>
                                ) :
                                ""
                        }
                    </ul>
                    {
                        !localStorage.getItem("authToken") ?
                            (
                                <div className='d-flex'>
                                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                                    <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
                                </div>
                            ) :
                            (
                                <>
                                    <div className="btn bg-white text-success mx-1" to="/cart" onClick={() => setCartView(true)}>
                                        My Cart {" "}
                                        <Badge pill bg='danger'>{data.length}</Badge>
                                    </div>
                                    {
                                        cartView ? (<Modal onClick={() => setCartView(false)}><Cart /></Modal>) : null
                                    }
                                    <div className="btn bg-white text-danger mx-1" to="/login" onClick={handleLogout}>Logout</div>
                                </>
                            )
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar