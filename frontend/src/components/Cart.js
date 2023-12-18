import React from 'react'
import { useCart, useCartDispatcher } from './ContextReducer'
// import trash from '../tr'

const Cart = () => {
    let data = useCart()
    console.log(data, "data")
    let dispatch = useCartDispatcher()
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center fs-3' style={{ color: "#fff" }}>Your Cart is Empty!</div>
            </div>
        )
    }
    let totalPrice = data.reduce((total, food) => total + food.price, 0)

    const handleCheckout = async () => {
        let userEmail = localStorage.getItem("userEmail")
        const response = await fetch('http://localhost:8000/api/orderData', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                order_data:data,
                email:userEmail,
                order_date:new Date().toDateString()
            })
        })
        // console.log("Response",response.status)
        // if (!response.ok) {
        //     console.error('Error:', response.status, response.statusText);
        // } else {
        //     console.log('Success:', typeof(response.status));
        // }
        if(response.status==200){
            dispatch({type:'DROP'})
        }

    }

    return (
        <div>
            <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md '>
                <table className='table table-hover'>
                    <thead className='text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map((food, index) => {
                                // console.log(food,"food")
                                return (<tr>
                                    <th style={{ color: "#fff" }} scope='row'>{index + 1}</th>
                                    <td style={{ color: "#fff" }}>{food.name}</td>
                                    <td style={{ color: "#fff" }}>{food.qty}</td>
                                    <td style={{ color: "#fff" }}>{food.size}</td>
                                    <td style={{ color: "#fff" }}>{food.price}</td>
                                    <td style={{ color: "#fff" }}>{<button style={{ color: "#fff" }} type='button' className='btn p-0 text-danger' onClick={() => { dispatch({ type: 'REMOVE', index: index }) }}>Delete</button>}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
                <div>
                    <h1 className='fs-2' style={{ color: "#fff" }}>Total Price :- {totalPrice}/-</h1>
                </div>
                <div className='btn bg-success mt-5' onClick={handleCheckout}>
                    Checkout
                </div>
            </div>
        </div>
    )
}

export default Cart