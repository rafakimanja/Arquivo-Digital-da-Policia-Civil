import './App.css'
import FormLogin from './components/Forms/FormLogin'
import MainPage from './components/MainPage'
import Arquivos from './components/Arquivos'
import RootLayout from './components/Routes/RootLayout'
import FormArquivo from './components/Forms/FormArquivo'
import ErrorPage from './components/Routes/ErrorPage'
import Configuracoes from './components/Config/Configuracoes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'

const usuarios = [
  {
    nome: 'admin',
    rg: 'admin',
    senha: 'admin',
    superuser: true
  },
  {
    nome: 'rafael',
    rg: '54321',
    senha: '1234',
    superuser: false
  }
]

function App() {

  const [userLog, setUserLog] = useState(null)

  const login = (rg, senha) => {
    let usuario = usuarios.find((user) => {
      return user.rg === rg && user.senha === senha
    })
    return usuario
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <FormLogin login={login} setUserLog={setUserLog} />
    },
    {
      path: "/index",
      element: <RootLayout userLog={userLog} />,
      errorElement: <ErrorPage/>,
      children: [
        {
          path: "",
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
