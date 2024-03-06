import './App.css';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './Componants/Layout/Layout';
import Home from './Componants/Home/Home';
import Products from './Componants/Products/Products'
import Categories from './Componants/Categories/Categories'
import Brands from "./Componants/Brands/Brands"
import Cart from './Componants/Cart/Cart'
import Register from './Componants/Register/Register'
import Login from './Componants/Login/Login'
import Notfound from './Componants/Notfound/Notfound';
import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/Token';
import ProtectedRoutes from './Componants/ProtectedRoutes/ProtectedRoutes';
import Protectedlogin from './Componants/Protectedlogin/Prodectedlogin';
import ProuductDatails from './Componants/ProuductDatails/ProuductDatails';
import CheckOut from './Componants/CheckOut/CheckOut';
import Allorders from './Componants/Allorders/Allorders';
import ForgetPass from './Componants/ForgetPass/ForgetPass';
import Resetpass from './Componants/Resetpass/Resetpass';
function App() {

  let{setToken}=useContext(TokenContext)
  const routes = createHashRouter([
    {
      path:"",element:<Layout />,children:[
       {index:true, path:"home",element:<ProtectedRoutes><Home /></ProtectedRoutes> },
       { path:"productes",element:<ProtectedRoutes><Products /></ProtectedRoutes>},
       { path:"categories",element:<ProtectedRoutes><Categories /></ProtectedRoutes>},
       { path:"brands",element:<ProtectedRoutes><Brands /></ProtectedRoutes>},
       { path:"cart",element:<ProtectedRoutes><Cart /></ProtectedRoutes>},
       { path:"checkout",element:<ProtectedRoutes><CheckOut /></ProtectedRoutes>},
       { path:"allorders",element:<ProtectedRoutes><Allorders /></ProtectedRoutes>},
       { path:"details/:id",element:<ProtectedRoutes><ProuductDatails /></ProtectedRoutes>},
       { path:"forgetpass",element:<ForgetPass />},
       { path:"resetpass",element:<Resetpass />},


       { path:"register",element:<Protectedlogin><Register /></Protectedlogin>},
       { path:"login",element:<Protectedlogin><Login /></Protectedlogin>},
       { path:"*",element:<Notfound />},


      ]
    }
  ])
  useEffect(()=>{
    if(localStorage.getItem("userToken")!=null){
      setToken(localStorage.getItem("userToken"))
    }
  },[] )
  return <RouterProvider router={routes}></RouterProvider>

  
}

export default App;
