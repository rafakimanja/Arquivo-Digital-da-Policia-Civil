import './App.css'
import FormLogin from './components/FormLogin'
import MainPage from './components/MainPage'
import Arquivos from './components/Arquivos'
import RootLayout from './components/Routes/RootLayout'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/Routes/ErrorPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <FormLogin/>
  },
  {
    path: "/index",
    element: <RootLayout/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "",
        element: <MainPage/>
      },
      {
        path: "arquivos",
        element: <Arquivos/>
      },
    ]
  },
])

const usuarios = [
  {
    nome: 'admin',
    senha: 'admin',
    superuser: true
  },
  {
    nome: 'rafael',
    senha: '1234',
    superuser: false
  }
]

const login = (usuario) => {
  usuarios.filter((user) => {
      return ((user.nome == usuario.nome) && (user.senha == usuario.senha))
  })
}

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
