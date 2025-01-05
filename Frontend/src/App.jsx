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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/create',
      element: <SignUp/>
    },
    {
      path: '/blogs',
      element: <Blogs/>
    },
    {
      path: '/createBlog',
      element: <CreateBlog/>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
