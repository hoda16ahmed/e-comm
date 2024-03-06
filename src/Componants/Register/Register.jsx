import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Register() {

  let navigate= useNavigate()
  const[errorMessage,setErrorMassage]= useState("")
  const[isLoading,setIsLoading]= useState(false)

   async function callRegister(regbody){
    console.log(regbody)
    setErrorMassage("")
    setIsLoading(true)

    let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,regbody)
    .catch((err) => {
      setIsLoading(false)
      setErrorMassage(err.response.data.message)}
      )
    console.log(data);
    if(data.message === "success"){
      navigate('/login')
    }
  }
  const validationSchema = Yup.object({
    name:Yup.string().min(3,"name is too short").max(10,"name is too long").required("Name is required"),
    email:Yup.string().email("email not valid").required("email is requried"),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/,"invalid password").required("password required"),
    rePassword:Yup.string().oneOf([Yup.ref("password")],"password and repassword should match").required("password required"),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,"invalid phone").required("phone required"),
  });
  const registerForm =useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:"",
    },
    validationSchema,
    onSubmit:callRegister
  })
  return (
    <div className={`${styles.Register}`}>
          <Helmet>
                <title>Rigester Page</title>
            </Helmet>
      <div className='container mx-auto my-5 min-vh-100'>
        <h2 className='mb-3 pt-5'>Register Now:</h2>
        {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> :null}
        
        <form onSubmit={registerForm.handleSubmit}>
          <div className='form-group mb-2'>
             <label htmlFor='fullName' className='mb-1'>Name:</label>
             <input type='text' id='fullName' value={registerForm.values.name} name='name' className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
             {registerForm.errors.name && registerForm.touched.name ? (
              <div className='alert alert-danger'>{""}{registerForm.errors.name}</div>
             ): null}
          </div>
          <div className='form-group mb-2'>
             <label htmlFor='email' className='mb-1'>Email:</label>
             <input type='email' id='email' value={registerForm.values.email} name='email' className='form-control' onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
             {registerForm.errors.email && registerForm.touched.email ? (
              <div className='alert alert-danger'>{""}{registerForm.errors.email}</div>
             ): null}
          </div>
          <div className='form-group mb-2'>
             <label htmlFor='password' className='mb-1'>Password:</label>
             <input type='password' id='password' value={registerForm.values.password} name='password' className='form-control'onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
             {registerForm.errors.password && registerForm.touched.password ? (
              <div className='alert alert-danger'>{""}{registerForm.errors.password}</div>
             ): null}
          </div>
          <div className='form-group mb-2'>
             <label htmlFor='rePassword' className='mb-1'>Re-password:</label>
             <input type='password' id='rePassword' value={registerForm.values.rePassword} name='rePassword' className='form-control'onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
             {registerForm.errors.rePassword && registerForm.touched.rePassword ? (
              <div className='alert alert-danger'>{""}{registerForm.errors.rePassword}</div>
             ): null}
          </div>
          <div className='form-group mb-2'>
             <label htmlFor='phone' className='mb-1'>Phone:</label>
             <input type='tel' id='phone' value={registerForm.values.phone} name='phone' className='form-control'onChange={registerForm.handleChange} onBlur={registerForm.handleBlur} />
             {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className='alert alert-danger'>{""}{registerForm.errors.phone}</div>
             ): null}
          </div>
          <button className={`${isLoading ? 'disabled' : ''} btn bg-main text-white d-block ms-auto`} disabled={!(registerForm.isValid&&registerForm.dirty)}>
            {isLoading ? <i className=' fa fa-spinner fa-spin'></i> : "Register now"} </button>         
        </form>
      </div>
    </div>
  )
}
