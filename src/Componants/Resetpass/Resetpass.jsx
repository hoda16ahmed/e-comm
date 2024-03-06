import React from 'react'
import styles from "./Resetpass.module.css"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


export default function Resetpass() {

  const validationSchema = Yup.object({

    email:Yup.string().email("email not valid").required("email is requried"),
    newPassword:Yup.string().required("password required"),

  
  });
 let navigate=useNavigate()
 async function respass(values){
   let{data}=await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values)
    if(data.token){
      navigate("/login")
    }
  }
let formik=useFormik(
  {
    initialValues:{
      email:'',
      newPassword:""

    },
    validationSchema,
    onSubmit:respass
  }
)
  return (
   <div className={`${styles.Resetpass} ForgetPassword container pt-5 mt-3`}>
          <Helmet>
                <title>Resetpass Page</title>
            </Helmet>
      <h3>Forget Password</h3>
      <form onSubmit={formik.handleSubmit} className=' w-75  my-5'>
        <label>email:</label>
        <input onBlur={formik.handleBlur} type='email' value={formik.values.email} onChange={formik.handleChange} id="email" name="email" className=' form-control' />
        {formik.touched.email&& formik.errors.email ?<p className=' text-danger '>{formik.errors.email}</p>:"  "}
        <label>newPassword:</label>
        <input onBlur={formik.handleBlur} type='password' value={formik.values.newPassword} onChange={formik.handleChange} id="newPassword" name="newPassword" className=' form-control' />
        {formik.touched.newPassword&& formik.errors.newPassword ?<p className=' text-danger '>{formik.errors.newPassword}</p>:"  "}
        <button disabled={!(formik.isValid&&formik.dirty)} type='submit' className=' btn bg-main text-light my-5' >send code</button>
      </form>
    </div>
  )
}
