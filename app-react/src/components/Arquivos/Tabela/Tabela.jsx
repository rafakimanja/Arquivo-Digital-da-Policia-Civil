import excluir from '../../../assets/delete_24.svg'
import baixar from '../../../assets/download_24dp.svg'
import './Tabela.css'

const Tabela = () => {
    return(
        <table id='documentos'>
            <colgroup>
                <col style={{ width: '30%' }} /> {/* Primeira coluna */}
                <col style={{ width: '20%' }} /> {/* Segunda coluna */}
                <col style={{ width: '25%' }} /> {/* Terceira coluna */}
                <col style={{ width: '15%' }} /> {/* Quarta coluna */}
            </colgroup>
                <tr>
                    <th id='th-nome'>Documento</th>
                    <th>Tipo</th>
                    <th>Última Alteração</th>
                    <th></th>
                </tr>
                <tr>
                    <td id='td-nome'>IP 905.24</td>
                    <td>IP</td>
                    <td>16/10/2024</td>
                    <td >
                        <div className="botoes-tabela">
                            <button id='button-baixar'>
                                <img src={baixar}/>
                            </button>
                            <button id='button-excluir'>
                                <img src={excluir}/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>PAI 915.23</td>
                    <td>PAI</td>
                    <td>10/05/2023</td>
                </tr>
                <tr>
                    <td>TC 901.24_compressed</td>
                    <td>TC</td>
                    <td>11/09/2024</td>
                </tr>
        </table>
    )
}

export default Tabela