import "./SidebarMenu.css"
import { Link } from "react-router-dom"

const SidebarMenu = ({userLog}) => {
    return(
        <>
        <nav className="menu">
            <ul>
                <li className="icon-home"><Link to={"/index"} className="sidebar-link"><span>Home</span></Link></li>
                <li className="icon-settings"><Link to={"/index/config"} className="sidebar-link"><span>Configurações</span></Link></li>
                { 
                    userLog.superuser ? (
                        <>
                            <li className="icon-add"><Link to={"/index/arquivos/new"} className="sidebar-link"><span>Adicionar</span></Link></li>
                            <li className="icon-search"><Link to={"/index/arquivos"} className="sidebar-link"><span>Pesquisar</span></Link></li>
                            <li className="icon-users"><Link to={"/index/users"} className="sidebar-link"><span>Usuários Cad.</span></Link></li> 
                        </>
                    ) : null
                }
                <li className="icon-exit" id="exit"><Link to={"/"} className="sidebar-link" onClick={() => {sessionStorage.removeItem('authToken')}} ><span>Sair</span></Link></li>
            </ul>
        </nav>
        </>
    )
}

export default SidebarMenu

