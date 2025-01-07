import Filtro from './Filtro/Filtro'
import Tabela from '../Tabela/Tabela'
import './Arquivos.css'

const Arquivos = () => {

    const colunas = [
        {
            Header: 'Documento',
            accessor: 'documento'
        },
        {
            Header: 'Tipo',
            accessor: 'tipo'
        },
        {
            Header: 'Última Alteração',
            accessor: 'dat_alt'
        }
    ]

    const dados = [
        {
            documento: 'IP 905.24',
            tipo: 'IP',
            dat_alt: '16/10/2024'
        },
        {
            documento: 'PAI 915.23',
            tipo: 'PAI',
            dat_alt: '10/05/2023'
        },
        {
            documento: 'TC 901.24_compressed',
            tipo: 'TC',
            dat_alt: '11/09/2024'
        }
    ]

    return(
        <div className='background-arquivos'>
            <Filtro/>
            <div className="tabela">
                <Tabela colunas={colunas} dados={dados} isDoc={true}/>
            </div>
        </div>
    )
}

export default Arquivos