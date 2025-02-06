import Filtro from './Filtro/Filtro'
import Tabela from '../Tabela/Tabela'
import './Arquivos.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Arquivos = () => {

    const [dados, setDados] = useState([])

    useEffect(() => {
        const carregaArquivos = async () => {
            setDados(await getArquivos())
        }
        carregaArquivos()
    }, [])

    const handleDeleteArquivo = async (arquivo) => {
        await deleteArquivo(arquivo.ID)
        setDados(prevDados => prevDados.filter(u => u.ID !== arquivo.ID))
    }

    const colunas = [
        {
            Header: 'Documento',
            accessor: 'arquivo'
        },
        {
            Header: 'Categoria',
            accessor: 'categoria'
        },
        {
            Header: 'Última Alteração',
            accessor: 'UpdatedAt'
        }
    ]

    return(
        <div className='background-arquivos'>
            <Filtro dados={dados} setDados={setDados} />
            <div className="tabela">
                <Tabela colunas={colunas} dados={dados} isDoc={true} functionDelete={handleDeleteArquivo} />
            </div>
        </div>
    )
}

export default Arquivos

export async function getArquivos() {
    const url = 'http://localhost:5000/index/documentos'
    const token = sessionStorage.getItem('authToken')
    const { data } = await axios.get(url, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    return data
}

export async function deleteArquivo(id) {
    const url = `http://localhost:5000/index/documentos/${id}`
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