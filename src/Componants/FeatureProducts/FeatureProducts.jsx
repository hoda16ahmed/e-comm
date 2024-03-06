import React, { useContext }  from 'react'
import styles from "./FeatureProducts.module.css"
import {BallTriangle} from "react-loader-spinner"
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContent } from '../../Context/Cartcontext'
import toast from 'react-hot-toast'





export default function FeatureProducts() {
  let {addToCart,setNumOfCartItems,addToWishlist} =useContext(CartContent)

  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let{data,isLoading} = useQuery("featuredproducts",getProducts)

   async function addCart(id){
    let res = await addToCart(id)
    if(res.data.status === 'success'){
      toast.success('Product added successfully.')
      setNumOfCartItems(res.data.numOfCartItems)


    }else{
      toast.error('Product added not  successfully.')

    }
  }

  return ( 
    <div className={`${styles.FeatureProducts}`}>
      <div className="container py-5">
      {isLoading ?<BallTriangle
  height={100}
  width={100}
  radius={5}
  color="#4fa94d"
  ariaLabel="ball-triangle-loading"
  wrapperStyle={{}}
  wrapperClass={"justify-contect-center"}
  visible={true}
  /> : <div className="row">
          
          {data?.data?.data.map((ele)=> <div key={ele.id} className="col-md-2 ">
            <div className="product px-3 py-3">
              <Link to={'/details/'+ele.id}>
               <img src={ele.imageCover} className='w-100' alt={ele.title}/>
              <p className='text-main'>{ele.category.name}</p>
              <h3 className='h6'>{ele.title.split(" ").slice(0,3).join("")}</h3>
              <div className="d-flex justify-content-between">
                <p>{ele.price}EGP</p>
                <p>
                  <i className='fa fa-star rating-color'></i>
                {ele.ratingsAverage}
                </p>

              </div>
              </Link>

              <button onClick={()=>addCart(ele.id)} className=' btn bg-main text-white w-100'>Add to Cart</button>
            </div>
          </div>
          )

          }
         

        </div> }
       
      </div>

    </div>
  )
}
