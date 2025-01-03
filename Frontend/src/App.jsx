import './App.css'
import {
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Login from './Components/Login'
import SignUp from './Components/SignUp'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login/>
    },
    {
      path: '/create',
      element: <SignUp/>
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
