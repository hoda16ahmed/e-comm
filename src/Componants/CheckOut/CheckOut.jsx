import React, { useContext } from 'react'
import styles from "./CheckOut.module.css"
import * as Yup from 'yup';

import {  useFormik } from 'formik'
import { CartContent } from '../../Context/Cartcontext';

export default function CheckOut() {

  let{onlinePayment}=useContext(CartContent)

  async function payment(values){
  let{data}= await onlinePayment(values)
  window.location.href=data.session.url
  }

  const validationSchema = Yup.object({
    details:Yup.string().min(10,"details is too short").max(20,"details is too long").required("details is required"),
    city:Yup.string().min(3,"city is too short").max(10,"city is too long").required("city is required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone").required("phone required"),
  });

let formik=useFormik({
initialValues:{
  "details":"",
  "phone":"",
  "city":""
},
validationSchema,
onSubmit:payment

})


  return (
    <div className={`${styles.CheckOut}`}>
      <div className='container mx-auto my-5'>
        <h2 className='mb-3'>Shipping Address</h2>
        
        <form onSubmit={formik.handleSubmit}>
          <div className='form-group mb-2'>
             <label htmlFor='details' className='mb-1'>Details:</label>
             <input type='text' id='details' value={formik.values.details} name='details' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {formik.errors.details && formik.touched.details ? (
              <div className='alert alert-danger'>{""}{formik.errors.details}</div>
             ): null}
          </div>
          <div className='form-group mb-2'>
             <label htmlFor='phone' className='mb-1'>Phone:</label>
             <input type='tel' id='phone' value={formik.values.phone} name='phone' className='form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {formik.errors.phone && formik.touched.phone ? (
              <div className='alert alert-danger'>{""}{formik.errors.phone}</div>
             ): null}
          </div>
          <div className='form-group mb-2'>
             <label htmlFor='city' className='mb-1'>city:</label>
             <input type='text' id='city' value={formik.values.city} name='city' className='form-control'onChange={formik.handleChange} onBlur={formik.handleBlur} />
             {formik.errors.city && formik.touched.city ? (
              <div className='alert alert-danger'>{""}{formik.errors.city}</div>
             ): null}
          </div>
          <button className=' btn bg-main w-100 text-white'>Pay now:D</button>
              
        </form>
      </div>
    </div>
  )
}
