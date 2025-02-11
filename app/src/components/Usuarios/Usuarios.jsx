import axios from "axios"
import FiltroUsers from "./Filtro/FiltroUsers"
import FiltroUserAtivo from "./Filtro/FiltroUserAtivo"
import Tabela from "../Tabela/Tabela"
import './Usuarios.css'
import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

const Usuarios = () => {

    const [dadosOriginais, setDadosOriginais] = useState([])
    const [usuarios, setUsuarios] = useState([])
    const [filtroUsuario, setFiltroUsuario] = useState(null)

    const resp = useLoaderData()

    const handleDeleteUser = async (user) => {
        await deleteUsuario(user.ID)
        if (resp) setUsuarios(prevUsuarios => prevUsuarios.filter(u => u.ID !== user.ID))
    }

    const handleDeleteFiltro = () => {
        setFiltroUsuario(null)
    }

    useEffect(() => {
         const carregaUsuarios = async() =>{
            setDadosOriginais(await getUsuarios())
         }
         carregaUsuarios()
    }, [])

    useEffect(() => {
        if(filtroUsuario){
            const dadosFiltrados = dadosOriginais.filter((user) => {
                return user.nome.toLowerCase().includes(filtroUsuario.toLowerCase())
            })
            setUsuarios(dadosFiltrados)
        } else {
            setUsuarios(dadosOriginais)
        }
    }, [filtroUsuario, dadosOriginais])

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
            {
                dadosOriginais.length > 0 ? 
                <>
                    <FiltroUsers setFiltroUsuario={setFiltroUsuario} />
                    {
                        filtroUsuario ? <div className="filtro-usuario"><FiltroUserAtivo content={filtroUsuario} handleDelete={handleDeleteFiltro} /></div> : ''
                    }
                    {
                        usuarios.length > 0 ?
                        <div className="lista-usuarios">
                            <Tabela dados={usuarios} colunas={colunas} isDoc={false} functionDelete={handleDeleteUser}/>
                        </div> : <p style={{marginTop: '20px', marginBottom: '20px', fontWeight: 'bold', fontSize: '18pt'}} >Nenhum usuario foi encontrado!</p>
                    }
                </> : <h1>Nenhum usuario cadastrado!</h1>
            }
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
        return true
    } catch (error) {
        alert(error)
        return false
    }
}