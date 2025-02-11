import Filtro from './Filtro/Filtro'
import Tabela from '../Tabela/Tabela'
import FiltrosAtivo from './Filtro/FiltrosAtivos'
import './Arquivos.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

const Arquivos = () => {

    const [dadosOriginais, setDadosOriginais] = useState([])
    const [dados, setDados] = useState([])
    const [filtro, setFiltro] = useState(null)

    const resp = useLoaderData()

    useEffect(() => {
        const carregaArquivos = async () => {
            const arquivos = await getArquivos()
            setDadosOriginais(arquivos)
            setDados(arquivos)
        }
        carregaArquivos()
    }, [])

    useEffect(() => {

        if(filtro){
            let dadosFiltrados = [...dadosOriginais]
        
            if(filtro.categoria){
                dadosFiltrados = dadosFiltrados.filter((item) => {
                    return item.categoria.toLowerCase().includes(filtro.categoria.toLowerCase())
                })
            }
            if(filtro.ano){
                dadosFiltrados = dadosFiltrados.filter((item) => {
                    return item.ano.toString().includes(filtro.ano)
                })
            }
            if(filtro.nome){
                dadosFiltrados = dadosFiltrados.filter((item) => {
                    return item.nome.toLowerCase().includes(filtro.nome.toLowerCase())
                })
            }
            setDados(dadosFiltrados)
        } else {
            setDados(dadosOriginais)
        }
    }, [filtro, dadosOriginais])

    const handleDeleteArquivo = async (arquivo) => {
        await deleteArquivo(arquivo.ID)
        if (resp) setDados(prevDados => prevDados.filter(u => u.ID !== arquivo.ID))
    }

    const handleDeleteFiltro = (contentFiltro) => {

        let novo_filtro = { ...filtro };  // Cria uma cópia do objeto
        delete novo_filtro[contentFiltro];  // Deleta a propriedade correspondente

        const novo_array = filtro.filtros_ativos.filter(filtro => filtro !== contentFiltro)
        novo_filtro.filtros_ativos = novo_array
        
        setFiltro(novo_filtro)
    }

    const handleAddFiltro = (filtro) => {
        setFiltro(filtro)
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
            Header: 'Ano',
            accessor: 'ano'
        },
        {
            Header: 'Última Alteração',
            accessor: 'UpdatedAt'
        }
    ]

    return(
        <div className='background-arquivos'>
            {
                dadosOriginais.length > 0 ?
                <>
                    <Filtro dados={dados} setDados={setDados} handleAddFiltro={handleAddFiltro} />
                    
                    { 
                        filtro ? 
                        <div className="filtros"> 
                            <FiltrosAtivo filtros={filtro.filtros_ativos} handleDelete={handleDeleteFiltro} />
                        </div>
                            : ''    
                    }
                    {
                        dados.length > 0 ? 
                        <div className="tabela">
                            <Tabela colunas={colunas} dados={dados} isDoc={true} functionDelete={handleDeleteArquivo}/>
                        </div> 
                        : <p style={{marginTop: '20px', fontWeight: 'bold', fontSize: '18pt'}} >Nenhum arquivo foi encontrado!</p>
                    }
                </> : <h1>Nenhum documento arquivado!</h1>
            }
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
        return true
    } catch (error) {
        alert(error)
        return false
    }
}