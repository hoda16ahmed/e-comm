import React, { useEffect, useState } from 'react'
import styles from "./Categories.module.css"
import axios from 'axios'
import { Helmet } from 'react-helmet'

export default function Categories() {

  const[categories,setCategories]=useState([])
  async function getcategories(){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   setCategories(data.data)
   console.log(data.data)
 }
 useEffect(()=>{
   getcategories()
 },[]) 
  return (

    <div classNameName={`${styles.Categories}`}>
          <Helmet>
                <title>categories Page</title>
            </Helmet>
        <div  className="container py-4 ">
            <div  className="row g-4">
            {categories.map(cat => <div  className="col-md-4 ">
                <div  className="card">
                  <div  className="card-img">
                    <img  alt="" className=" w-100" height={"300"} src={cat.image} />
                  </div>
                    <div  className="card-body">
                      <p  className="text-success h3 text-center">{cat.name}</p>
                  </div>
                </div>
              </div>
              )} 
           </div> 
           </div>
          
           
    </div>
    )           
}
