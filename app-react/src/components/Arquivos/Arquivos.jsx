import Filtro from './Filtro/Filtro'
import Tabela from './Tabela/Tabela'
import './Arquivos.css'

const Arquivos = () => {
    return(
        <div className='background-arquivos'>
            <Filtro/>
            <div className="tabela">
            <Tabela/>
            </div>
        </div>
    )
}

export default Arquivos