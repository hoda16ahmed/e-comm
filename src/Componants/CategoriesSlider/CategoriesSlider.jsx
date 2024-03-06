import React, { useEffect, useState } from 'react'
import styles from "./CategoriesSlider.module.css"
import axios from 'axios'
import Slider from 'react-slick';

export default function CategoriesSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1
  };
  const[categories,setCategories]=useState([])
 async function getcategories(){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  setCategories(data.data)
}
useEffect(()=>{
  getcategories()
},[])
  return (
    <div className={`${styles.MainSlider} container my-5 px-1`}>
      <h2>Shoo Popular Cateaories</h2>
      <Slider {...settings} >

          {categories.map(cat => <div className='cat'>
        <img src={cat.image} height={"200"} className='w-100 ' alt='' />
        <h5>{cat.name}</h5>

      </div>)}

      </Slider>
     
   </div>
  )
} 
