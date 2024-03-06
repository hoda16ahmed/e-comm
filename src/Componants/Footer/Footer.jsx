import React from 'react'
import * as Yup from 'yup';

import styles from "./Footer.module.css"
import { useFormik } from 'formik';


export default function Footer() {

  const validationSchema = Yup.object({
    email:Yup.string().email("email not valid").required("email is requried"),
  })
    
  const footerform =useFormik({
    initialValues:{
      email:"",
    },
    validationSchema,
  
  })

  return (
    <footer className={`${styles.Footer} bg-main-light mt-5 pt-5   p-3`}>
      <div className="container py-5">
        <h2 >Get the FreshCart app</h2>
      <p>We Will send you a link,open it on your phone to download the app </p>
          <form> 
       <div className='form-group mb-2'>
             <label htmlFor='email' className='mb-1'>Email:</label>
             <input type='email' id='email' value={footerform.values.email} name='email' className='form-control' onChange={footerform.handleChange} onBlur={footerform.handleBlur} />

             {footerform.errors.email && footerform.touched.email ? (
              <div className='alert alert-danger'>{""}{footerform.errors.email}</div>
             ): null}
             </div>
     
      </form>
      
      </div>
      
    </footer>
  )
}
