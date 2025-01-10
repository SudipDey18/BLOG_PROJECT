import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Blogs from './Components/Blogs';
import CreateBlog from './Components/CreateBlog';
import NavBar from './Components/NavBar';
import { useEffect, useState } from 'react';
import { isLogin } from './Api.jsx';
import { getCookie } from './Cookie/Cookie.js';
import Logout from './Components/Logout.jsx';

function App() {
  
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginUser, setLoginUser] = useState({
    Name: '',
    Email: '',
    Role: ''
  });

  useEffect( () => {
    const fetchData = async () => {
      try {
        const cookieData = await getCookie();
        // console.log(cookieData);
        
        if (cookieData.Error) {
          console.log(cookieData.Error);
        }else {
          const apiData = (await (isLogin(cookieData))).data;
          // console.log(apiData.User);
          
          if (apiData.isLogin) {
            setLoginStatus(true);
            setLoginUser({
              Name: apiData.User.Name,
              Email: apiData.User.Email,
              Role: apiData.User.Role
            });
          }
        }
        
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [loginStatus]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <NavBar loginUser = {loginUser} loginStatus = {loginStatus} />
        <Login setLoginStatus = {setLoginStatus} loginStatus = {loginStatus} loginUserData={loginUser}/>
      </>
    },
    {
      path: '/createUser',
      element: <>
        <NavBar loginUser = {loginUser} loginStatus = {loginStatus} />
        <SignUp/>
      </>
    },
    {
      path: '/blogs',
      element: <>
        <NavBar loginUser = {loginUser} loginStatus = {loginStatus} />
        <Blogs/>
      </>
    },
    {
      path: '/createBlog',
      element: <>
        <NavBar loginUser = {loginUser} loginStatus = {loginStatus} />
        <CreateBlog loginUser = {loginUser}/>
      </>
    },
    {
      path: '/nav',
      element: <NavBar  loginUser = {loginUser} loginStatus = {loginStatus} />
    },
    {
      path: '/logout',
      element: <>
        <NavBar  loginUser = {loginUser} loginStatus = {loginStatus} />
        <Logout setLoginStatus = {setLoginStatus} setLoginUser = {setLoginUser} loginStatus = {loginStatus} />
      </>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
