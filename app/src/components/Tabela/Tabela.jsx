import { Link } from 'react-router-dom'
import excluir from '../../assets/delete_24.svg'
import baixar from '../../assets/download_24dp.svg'
import editar from '../../assets/edit_24dp.svg'
import './Tabela.css'

const Tabela = ({colunas, dados, isDoc, functionDelete}) => {
    return(
        <table id='documentos'>
            <colgroup>
                {
                    isDoc ? (
                        <>
                            <col style={{ width: '30%' }} /> {/* Primeira coluna */}
                            <col style={{ width: '20%' }} /> {/* Segunda coluna */}
                            <col style={{ width: '25%' }} /> {/* Terceira coluna */}
                            <col style={{ width: '18%' }} /> {/* Quarta coluna */}
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
                    dados.map((info) => (
                        <tr key={info.ID}>
                            {
                                colunas.map((coluna) => (
                                    <td key={coluna.accessor}>{coluna.accessor == 'admin' ? info[coluna.accessor] ? 'sim' : 'não' : info[coluna.accessor]}</td>
                                ))
                            }
                            <td>
                                <div className="botoes-tabela">
                                    {
                                        isDoc ? (
                                            <button id='button-baixar'>
                                                <img src={baixar}/>
                                            </button>
                                        ) : (
                                            <Link to={`${info.ID}/edit`}><button id="button-editar"><img src={editar}/></button></Link>
                                        )
                                    }
                                    <button id='button-excluir' onClick={async () => await functionDelete(info)}>
                                        <img src={excluir}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }                
            </tbody>
        </table>
    )
}

export default Tabela