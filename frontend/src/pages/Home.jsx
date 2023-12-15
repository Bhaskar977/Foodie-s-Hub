import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'

const Home = () => {

    const [foodCategory, setFoodCategory] = useState([])
    const [foodItems, setFoodItems] = useState([])

    const loadData = async () => {
        let response = await fetch("http://localhost:8000/api/fooddata", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            }
        })
        response = await response.json()
        setFoodItems(response[0])
        setFoodCategory(response[1])
    }

    useEffect(() => {
        loadData()
    }, [])

    return (
        <>
            <div><Navbar /></div>
            <div>
                <Carousel />
            </div>
            <div className='container'>
                {
                    foodCategory ?
                        (
                            foodCategory.map((data) => {
                                return (
                                    <div className='row mb-3'>
                                        <div key={data.id} className='fs-3 m-3'>{data.CategoryName}</div>
                                        <hr />
                                        {
                                            foodItems?(
                                                foodItems.filter((el)=> el.CategoryName==data.CategoryName)
                                                .map((filteritem)=>{
                                                    // console.log(data.CategoryName,filteritem)
                                                    return(
                                                        <div key={filteritem._id} className='col-12 col-md-6 col-lg-3'>
                                                            <Card name = {filteritem.name} image = {filteritem.img} />
                                                        </div>
                                                    )
                                                })
                                            ):(<div>No such Data Found</div>)
                                        }
                                    </div>
                                )
                            })
                        ) :
                        (
                            ""
                        )
                }
            </div>
            <div><Footer /></div>
        </>
    )
}

export default Home