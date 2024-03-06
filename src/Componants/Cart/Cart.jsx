import React, { useContext, useEffect, useState } from 'react'
import styles from "./Cart.module.css"
import { CartContent } from '../../Context/Cartcontext'
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

  const[cartdetails,setCartDetails]=useState({})

  let{getCart, deleteProduct,updateProduct,setNumOfCartItems}= useContext(CartContent)

  async function removeItem(id){
    let{data}=await deleteProduct(id)
    setCartDetails(data)
    setNumOfCartItems(data.numOfCartItems)
  }

  async function getCartDetails(){
   let {data}= await getCart()
   setCartDetails(data)
   setNumOfCartItems(data.numOfCartItems)
  }

  async function updateCount(id,count){
   let {data}= await updateProduct(id,count)
   if(count === 0) {
    removeItem(id)
   } else {
    setCartDetails(data)
   }
   
  }
useEffect(()=>{
  getCartDetails()
},[])

  return (
    <div className={`${styles.Cart}`}>
          <Helmet>
                <title>cart Page</title>
            </Helmet>
      {cartdetails.data ? <div className="container my-5 py-3">
        <div className="mx-auto bg-main-light p-5">

          <h1 className=' mb-3'>Cart Shop</h1>
          <div className=' d-flex justify-content-between align-items-center' >
            <h3 className=' h5'>Total Price: <span className='text-main'>{cartdetails.data.totalCartPrice} Egp</span></h3>
            <h3 className='h5'>Total art item: <span className='text-main'>{cartdetails.numOfCartItems}</span></h3>
          </div>

        {cartdetails.data.products.map((ele)=> <div key={ele.product._id} className="row py-2 border-bottom">
            <div className="col-md-1">
              <img src={ele.product.imageCover} className='w-100' alt="" />
            </div>
            <div className="col-md-11">
              <div className="d-flex justify-content-between">
                <div className="left-side">
                  <h4>{ele.product.title}</h4>
                  <p>{ele.price}EGP</p>
                </div>
                <div className="rightside">
                  <button onClick={()=>updateCount(ele.product._id,ele.count-1)} className='btn btn-primary'>-</button>
                  <span className=' mx-2'>{ele.count}</span>
                  <button onClick={()=>updateCount(ele.product._id,ele.count+1)} className='btn btn-primary'>+</button>
                </div>
              </div>
              <button onClick={()=>removeItem(ele.product._id)} className='btn text-danger p-0'><i className=' fa fa-trash-can'></i>remove </button>
            </div>
          </div> )}
          <Link className='btn bg-main w-100 my-5 'to={'/checkout'}>checkout</Link>
         
            
        </div>
      </div> :<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass={"justify-contect-center"}
  visible={true}/>}
      
    </div>
  )
}
