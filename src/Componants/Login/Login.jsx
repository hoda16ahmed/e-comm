import React, { useContext, useState } from 'react'
import styles from "./Login.module.css"
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';
import { useFormik } from 'formik';
import { TokenContext } from '../../Context/Token';
import { Helmet } from 'react-helmet';


export default function Login() {
  let navigate= useNavigate()
  const[errorMessage,setErrorMassage]= useState("")
  const[isLoading,setIsLoading]= useState(false)
  let {setToken} = useContext(TokenContext)

   async function callLogin(regbody){
    
    setErrorMassage("")
    setIsLoading(true)

    let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,regbody)
    .catch((err) => {
      setIsLoading(false)
      setErrorMassage(err.response.data.message)}
      )
    if(data.message === "success"){
      localStorage.setItem("userToken",data.token  )
      setToken(data.token)
      navigate('/home')
    }
  }
  const validationSchema = Yup.object({

    email:Yup.string().email("email not valid").required("email is requried"),
    password:Yup.string().required("password required"),
  
  });
  const loginForm =useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema,
    onSubmit:callLogin
  })
  return (
    <div className={`${styles.Login}`}>
          <Helmet>
                <title>login Page</title>
            </Helmet>
      <div className='container mx-auto my-5 min-vh-100'>
        <h2 className='mb-3 pt-5'>Login Now:</h2>
        {errorMessage ? <div className='alert alert-danger'>{errorMessage}</div> :null}
        
        <form onSubmit={loginForm.handleSubmit}>
      
          <div className='form-group mb-2'>
             <label htmlFor='email' className='mb-1'>Email:</label>
             <input type='email' id='email' value={loginForm.values.email} name='email' className='form-control' onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
             {loginForm.errors.email && loginForm.touched.email ? (
              <div className='alert alert-danger'>{""}{loginForm.errors.email}</div>
             ): null}
          </div>
          <div className='form-group mb-2'>
             <label htmlFor='password' className='mb-1'>Password:</label>
             <input type='password' id='password' value={loginForm.values.password} name='password' className='form-control'onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} />
             {loginForm.errors.password && loginForm.touched.password ? (
              <div className='alert alert-danger'>{""}{loginForm.errors.password}</div>
             ): null}
          </div>
          <button className={`${isLoading ? 'disabled' : ''} btn bg-main text-white d-block ms-auto`} disabled={!(loginForm.isValid&&loginForm.dirty)}>
            {isLoading ? <i className=' fa fa-spinner fa-spin'></i> : "Login now"} </button>  
            <Link to={"/forgetpass"}><span className='text-main'>ForgetPassword</span></Link>       
        </form>
      </div>
    </div>
  )
}
