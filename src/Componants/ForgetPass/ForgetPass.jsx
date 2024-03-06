import React from 'react'
import styles from "./ForgetPass.module.css"
import * as Yup from 'yup';

import { useFormik } from 'formik'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ForgetPass() {
  const validationSchema = Yup.object({

    email:Yup.string().email("email not valid").required("email is requried"),
  
  });

 async function sendcode(values){
   let{data}=await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",values)
  if(data.statusMsg === "success"){
    document.querySelector(".ForgetPassword").classList.add("d-none")
    document.querySelector(".verfiyCode").classList.remove("d-none")

  }
  }
let formik=useFormik(
  {
    initialValues:{
      email:' '
    },
    validationSchema,
    onSubmit:sendcode
  }
)
  const validationSchema2 = Yup.object({

    resetCode:Yup.string().required("resetcode is requried"),
  
  });


  let navigate=useNavigate()
 async function verifyResetCode(values){
   let{data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",values)
   if(data.status ==="Success"){
    navigate("/resetpass")
   }
  }
let verfiyFormik=useFormik(
  {
    initialValues:{
      resetCode:''
    },
    validationSchema:validationSchema2,
    onSubmit:verifyResetCode
  }
)



  return (
    <>
     <div className={`${styles.ForgetPass} ForgetPassword container pt-5 mt-3`}>
     <Helmet>
                <title>ForgetPass Page</title>
            </Helmet>
      
      <h3>Forget Password</h3>
      <form onSubmit={formik.handleSubmit} className=' w-75  my-5'>
        <label>email:</label>
        <input onBlur={formik.handleBlur} type='email' value={formik.values.email} onChange={formik.handleChange} id="email" name="email" className=' form-control' />
        {formik.touched.email&& formik.errors.email ?<p className=' text-danger '>{formik.errors.email}</p>:"  "}
        <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className=' btn bg-main text-light my-5' >send code</button>
      </form>
    </div>
     <div className="verfiyCode container d-none pt-5 mt-3">
      
      <h3>verfiyCode</h3>
      <form onSubmit={verfiyFormik.handleSubmit} className=' w-75 '>
        <label>resetCode:</label>
        <input onBlur={verfiyFormik.handleBlur} type='text' value={verfiyFormik.values.resetCode} onChange={verfiyFormik.handleChange} id="resetCode" name="resetCode" className=' form-control' />
        {verfiyFormik.touched.resetCode&& verfiyFormik.errors.resetCode ?<p className=' text-danger '>{verfiyFormik.errors.resetCode}</p>:"  "}
        <button disabled={!(verfiyFormik.isValid&&verfiyFormik.dirty)} type='submit' className=' btn bg-main text-light my-5' >send code</button>
      </form>
    </div>
    </>
   
  )
}
