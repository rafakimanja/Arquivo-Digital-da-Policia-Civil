import FiltroUsers from "./Filtro/FiltroUsers"
import Tabela from "../Tabela/Tabela"
import './Usuarios.css'

const Usuarios = ({usuarios}) => {

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
            <FiltroUsers/>
           <div className="lista-usuarios">
                <Tabela dados={usuarios} colunas={colunas} isDoc={false}/>
           </div>
        </div>
    )
}

export default Usuarios