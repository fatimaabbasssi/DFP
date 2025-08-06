import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import AuthForms from '../components/AuthForms'
import Profile from '../components/Profile'
import ProtectedRoutes from '../components/ProtectedRoutes'
import ForgetPassword from '../pages/ForgetPassword'
import ResetPass from '../components/ResetPass'
import Customer from '../components/Customer'

    const router = createBrowserRouter([

        {
            path:'/',
            element:<App/>,
            children:[
               {
                 index : true,
                 element:(
                    <Home/>
                 )
               },
               {
                
                 path : '/profile',
                 element :(
                  <ProtectedRoutes>
                     <Profile/>
                  </ProtectedRoutes>
                   
                 ) 
               },
            ]
        },
             {
                
                 path : '/customer',
                 element :(
                  <ProtectedRoutes role='admin'>
                     <Customer/>
                  </ProtectedRoutes>
                   
                 ) 
               }
,
        // authentication
        {path:'/auth' , element:<AuthForms/> },

        // forget password
         {path:'/forgetPass' , element:<ForgetPassword/> },
         {path:'/resetpass/:token' , element:<ResetPass/> }

    ])

export default router