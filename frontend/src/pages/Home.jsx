import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import Carousel from '../components/Carousel'

const Home = () => {

    const [foodCategory, setFoodCategory] = useState([])
    const [foodItems, setFoodItems] = useState([])
    const [search,setSearch] = useState("")

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
                <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div class="carousel-inner" id="carousel">
                        <div className='carousel-caption' style={{ zIndex: "10" }} >
                            <div className="d-flex justify-content-center">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
                                {/* <button class="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                            </div>
                        </div>
                        <div class="carousel-item active">
                            <img src="https://source.unsplash.com/random/900x700/?burger" style={{ filter: "brightness(30%)" }} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?pastry" style={{ filter: "brightness(30%)" }} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item">
                            <img src="https://source.unsplash.com/random/900x700/?barbeque" style={{ filter: "brightness(30%)" }} class="d-block w-100" alt="..." />
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
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
                                            foodItems ? (
                                                foodItems.filter((el) => (el.CategoryName == data.CategoryName)&&(el.name.toLowerCase().includes(search.toLowerCase())))
                                                    .map((filteritem) => {
                                                        // console.log(data.CategoryName,filteritem)
                                                        return (
                                                            <div key={filteritem._id} className='col-12 col-md-6 col-lg-3'>
                                                                <Card
                                                                    foodItem = {filteritem}
                                                                    options={filteritem.options}
                                                                />
                                                            </div>
                                                        )
                                                    })
                                            ) : (<div>No such Data Found</div>)
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