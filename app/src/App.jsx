import './App.css'
import FormLogin, {loginUser} from './components/Forms/FormLogin'
import MainPage from './components/MainPage'
import Arquivos, { deleteArquivo, getArquivos } from './components/Arquivos/Arquivos'
import RootLayout from './components/Routes/RootLayout'
import FormArquivo, { addArquivo } from './components/Forms/FormArquivo'
import ErrorPage from './components/Routes/ErrorPage'
import Configuracoes from './components/Config/Configuracoes'
import Usuarios, {deleteUsuario, getUsuarios} from './components/Usuarios/Usuarios'
import FormUsers, {addUser} from './components/Forms/FormUsers'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'
import UpdateUsers, { getUsuario, updateUsuario } from './components/Forms/UpdateUsers'
import UpdateArquivo, { getArquivo, updateArquivo } from './components/Forms/UpdateArquivo'

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
          children: [
            {index: true, element: <Arquivos/>, loader: getArquivos, action: deleteArquivo},
            {path: "new", element: <FormArquivo/>, action: addArquivo},
            {path: ":id/edit", element: <UpdateArquivo/>, loader: getArquivo, action: updateArquivo}
          ]
        },
        {
          path: "config",
          element: <Configuracoes/>
        },
        {
          path: "users",
          children: [
            {index: true, element: <Usuarios/>, loader: getUsuarios, action: deleteUsuario},
            {path: "new", element: <FormUsers/>, action: addUser },
            {path: ':id/edit', element: <UpdateUsers/>, loader: getUsuario, action: updateUsuario}
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
