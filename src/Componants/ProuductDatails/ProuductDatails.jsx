import React, { useContext, useEffect, useState } from 'react'
import styles from "./ProuductDatails.module.css"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {BallTriangle} from "react-loader-spinner"
import Slider from 'react-slick'
import { CartContent } from '../../Context/Cartcontext'
import toast from 'react-hot-toast'


export default function ProuductDatails() {
  let {addToCart,setNumOfCartItems} =useContext(CartContent)


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };


  const[details,setDetails]=useState([])
  const[isLoading,setIsLoading]=useState(true)

  let params =useParams()

  async function getProductDetails(id){
    let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
    setIsLoading(false)
  }

  async function addCart(id){
    let res = await addToCart(id)
    if(res.data.status === 'success'){
      toast.success('Product added successfully.')
      setNumOfCartItems(res.data.numOfCartItems)


    }else{
      toast.error('Product added not  successfully.')

    }
  }

 
  useEffect(()=>{
    getProductDetails(params.id)
  },[])



  return (
    <div className={`${styles.ProuductDatails}`}>
    <div className="container py-5">
      {isLoading?<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass={"justify-content-center"}
  visible={true}
  /> :<div className="row align-items-center">
    
        <div  className="col-md-4 ">
        <Slider {...settings}>
          {details.images.map((ele,index)=><img key={index} src={ele} className='w-100' alt="" />)
}
    </Slider>
        </div>
        <div className="col-md-8">
          <h2>{details.title}</h2>
          <p>{details.description}</p>
          <p>{details.category.name}</p>
          <div className="d-flex justify-content-between">
            <h5>{details.price} EGP</h5>
            <h5><i className=' fa fa-star rating-color'></i>{details.ratingAverage}</h5>
          </div>
      
            <button onClick={()=>addCart(details.id)} className=' btn bg-main w-100 text-white '>Add to card</button>
          </div>
        </div>}

      </div>
    </div>
  )
  
}
