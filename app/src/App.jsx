import './App.css'
import FormLogin, {loginUser} from './components/Forms/FormLogin'
import MainPage from './components/MainPage'
import Arquivos from './components/Arquivos/Arquivos'
import RootLayout from './components/Routes/RootLayout'
import FormArquivo from './components/Forms/FormArquivo'
import ErrorPage from './components/Routes/ErrorPage'
import Configuracoes from './components/Config/Configuracoes'
import Usuarios from './components/Usuarios/Usuarios'
import FormUsers from './components/Forms/FormUsers'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'

function App() {

  const [userLog, setUserLog] = useState(null)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FormLogin setUserLog={setUserLog}/>,
      action:  loginUser
    },
    {
      path: "/index",
      element: <RootLayout userLog={userLog} />,
      errorElement: <ErrorPage/>,
      children: [
        {
          index: true,
          element: <MainPage userLog={userLog} />
        },
        {
          path: "arquivos",
          element: <Arquivos/>
        },
        {
          path: "form",
          element: <FormArquivo/>
        },
        {
          path: "config",
          element: <Configuracoes/>
        },
        {
          path: "users",
          children: [
            {
              index: true, 
              element: <Usuarios/>
            },
            {
              path: "formUser",
              element: <FormUsers/>
            }
          ]
        }
      ]
    },
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
