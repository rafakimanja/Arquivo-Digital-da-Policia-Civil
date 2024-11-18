import './App.css'
import FormLogin from './components/FormLogin'
import MainPage from './components/MainPage'
import Arquivos from './components/Arquivos'
import RootLayout from './components/Routes/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/Routes/ErrorPage'
import { useRef } from 'react'

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

const login = (rg, senha) => {
  let usuario = usuarios.find((user) => {
    return user.rg === rg && user.senha === senha
  })
  return usuario
}

const router = (userLog) => createBrowserRouter([
  {
    path: "/",
    element: <FormLogin login={login} userLog={userLog} />
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
    ]
  },
])

function App() {

  const userLog = useRef()

  return (
    <>
      <RouterProvider router={router(userLog)}/>
    </>
  )
}

export default App
