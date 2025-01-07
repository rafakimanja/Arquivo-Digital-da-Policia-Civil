import FiltroUsers from "./Filtro/FiltroUsers"
import Tabela from "../Tabela/Tabela"
import './Usuarios.css'

const Usuarios = () => {

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

    const dados = [
        {
            nome: 'Del. João Henrique',
            admin: 'sim'
        },
        {
            nome: 'Tuilara-lavarda',
            admin: 'não'
        },
        {
            nome: 'Suanemax-amaral',
            admin: 'não'
        }
    ]

    return(
        <div className="background-usuarios">
            <FiltroUsers/>
           <div className="lista-usuarios">
                <Tabela dados={dados} colunas={colunas} isDoc={false}/>
           </div>
        </div>
    )
}

export default Usuarios