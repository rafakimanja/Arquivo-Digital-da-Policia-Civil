import { Link } from 'react-router-dom'
import JsFileDownloader from 'js-file-downloader'
import excluir from '../../assets/delete_24.svg'
import baixar from '../../assets/download_24dp.svg'
import editar from '../../assets/edit_24dp.svg'
import Paginacao from './Paginacao'
import './Tabela.css'
import { useEffect, useState } from 'react'

const Tabela = ({colunas, dados, isDoc, functionDelete}) => {

    const [pageNumber, setPageNumber] = useState(1)
    const pageSize = 10

    const handleDownload = (id, nome) => {
        console.log(nome)

        const token = sessionStorage.getItem('authToken')

        let downloadOptions = {
            url: `http://localhost:5000/index/documentos/donwload/${id}`,
            filename: nome+'.pdf',
            headers: [
                {name: 'Authorization', value: `Bearer ${token}`}
            ]
        }

        new JsFileDownloader(downloadOptions)
        .then(() => {
        })
        .catch(() => {
            alert('Erro ao baixar o arquivo!')
        })
    }

    const handleContentTable = (coluna, dado) => {
        switch(coluna.accessor){
            case 'admin':
                if(dado[coluna.accessor]) return 'sim'
                else return 'não'
            case 'UpdatedAt':
                return new Date(dado[coluna.accessor]).toLocaleString("pt-BR")
            default:
                return dado[coluna.accessor]
        }
    }

    const handleDelete = async (info) => {
        if(window.confirm("Tem certeza que deseja excluir o item ?")){
            await functionDelete(info)
        } else {
            return
        }
    }

    const totalPages = Math.ceil(dados.length / pageSize)
    
    const startIndex = (pageNumber - 1) * pageSize
    const endIndex = startIndex + pageSize
    const itemsOnPage = dados.slice(startIndex, endIndex)

    return(
        <table id='documentos'>
            <colgroup>
                {
                    isDoc ? (
                        <>
                            <col style={{ width: '30%' }} /> {/* Primeira coluna */}
                            <col style={{ width: '20%' }} /> {/* Segunda coluna */}
                            <col style={{ width: '10%' }} /> {/* Terceira coluna */}
                            <col style={{ width: '25%' }} /> {/* Quarta coluna */}
                            <col style={{ width: '18%' }} /> {/* Quinta coluna */}
                        </>
                    ) : (
                        <>
                            <col style={{ width: '20%' }} /> {/* Primeira coluna */}
                            <col style={{ width: '10%' }} /> {/* Segunda coluna */}
                            <col style={{ width: '5%' }} /> {/* Terceira coluna */}
                        </>
                    )
                }                
            </colgroup>
            <thead>
                 <tr>
                   {
                    colunas.map((coluna) => (
                        <th key={coluna.accessor}>{coluna.Header}</th>
                    ))
                   }
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    itemsOnPage.map((info) => (
                        <tr key={info.ID}>
                            {
                                colunas.map((coluna) => (
                                    <td key={coluna.accessor}>{handleContentTable(coluna, info)}</td>
                                ))
                            }
                            <td>
                                <div className="botoes-tabela">
                                    {
                                        isDoc ? (
                                            <button id='button-baixar' onClick={() => handleDownload(info.ID, info.nome)}>
                                                <img src={baixar}/>
                                            </button>
                                        ) : ''
                                    }
                                    <Link to={`${info.ID}/edit`}><button id="button-editar"><img src={editar}/></button></Link>
                                    <button id='button-excluir' onClick={() => handleDelete(info)}>
                                        <img src={excluir}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }                
            </tbody>
            {
                dados.length > 10 ? <Paginacao totalPages={totalPages} pageNumber={pageNumber} setPageNumber={setPageNumber}  /> : ''
            }
        </table>
    )
}

export default Tabela