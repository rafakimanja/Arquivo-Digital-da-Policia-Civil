import axios from "axios"
import FiltroUsers from "./Filtro/FiltroUsers"
import Tabela from "../Tabela/Tabela"
import './Usuarios.css'
import { useEffect, useState } from "react"

const Usuarios = () => {

    const [usuarios, setUsuarios] = useState([])

    const handleDeleteUser = async (user) => {
        await deleteUsuario(user.ID)
        setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.ID !== user.ID))
    }

    useEffect(() => {
         const carregaUsuarios = async() =>{
            setUsuarios(await getUsuarios())
         }
         carregaUsuarios()
    }, [])

    const colunas = [
        {
            Header: 'Nome',
            accessor: 'nome'
        },
        {
            Header: 'Administrador',
            accessor: 'admin'
        }
    ]

    return(
        <div className="background-usuarios">
            <FiltroUsers usuarios={usuarios} setUsuarios={setUsuarios} />
           <div className="lista-usuarios">
                <Tabela dados={usuarios} colunas={colunas} isDoc={false} functionDelete={handleDeleteUser}/>
           </div>
        </div>
    )
}

export default Usuarios

export async function getUsuarios(){
    const url = 'http://localhost:5000/index/usuarios'
    const token = sessionStorage.getItem('authToken')
    const {data} = await axios.get(url, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    return data
}

export async function deleteUsuario(id) {
    const url = `http://localhost:5000/index/usuarios/${id}`
    const token = sessionStorage.getItem('authToken')
    try {
        const response = await axios.delete(url, {headers: {
            'Authorization': `Bearer ${token}`
        }})
        alert(response.data.message)
    } catch (error) {
        alert(error)
    }
    return null
}