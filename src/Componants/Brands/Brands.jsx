import React, { useEffect, useState } from 'react'
import styles from "./Brands.module.css"
import axios from 'axios'
import { Helmet } from 'react-helmet'

export default function Brands() {

  const[brands,setBrands]=useState([])
  async function getBrands(){
   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
   setBrands(data.data)
 }
 useEffect(()=>{
   getBrands()
 },[]) 


  return (
    <div className={`${styles.Brands}`}>
          <Helmet>
                <title>Brands Page</title>
            </Helmet>
      <div  className="container my-3">
        <h1  className="text-main text-center mb-5">All Brands</h1>

        <div  className="row g-4">
        {brands.map(bra => <div  className="col-md-3 ">
            <div   className="card">
              <div  className="card-img">
                <img  alt="" className="w-100" src= {bra.image} />
              </div>
                <div  className="card-body">
                  <p  className="text-center">{bra.name}</p>
                </div>
            </div>
          </div>)}
          </div>
       </div>
      </div>
  )
}
