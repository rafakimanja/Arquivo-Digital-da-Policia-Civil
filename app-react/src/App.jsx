import './App.css'
import FormLogin from './components/Forms/FormLogin'
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

const usuarios = [
  {
    nome: 'admin',
    rg: 'admin',
    senha: 'admin',
    admin: true
  },
  {
    nome: 'rafael-lopes',
    rg: '54321',
    senha: '1234',
    admin: false
  },
  {
    nome: 'tuilara-lavarda',
    rg: '7053688417',
    senha: 'Juma@2024',
    admin: false
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
              element: <Usuarios usuarios={usuarios}/>
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
