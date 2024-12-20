import "./SidebarMenu.css"
import { Link } from "react-router-dom"

const SidebarMenu = ({userLog}) => {
    return(
        <>
        <nav className="menu">
            <ul>
                <li className="icon-home"><Link to={"/index"}><span>Home</span></Link></li>
                <li className="icon-settings"><Link to={"/index/config"}><span>Configurações</span></Link></li>
                { 
                    userLog.superuser ? (
                        <>
                            <li className="icon-add"><Link to={"/index/form"}><span>Adicionar</span></Link></li>
                            <li className="icon-search"><Link to={"/index/arquivos"}><span>Pesquisar</span></Link></li>
                            <li className="icon-users"><span>Usuários Cad.</span></li> 
                        </>
                    ) : null
                }
                <li className="icon-exit" id="exit"><Link to={"/"}><span>Sair</span></Link></li>
            </ul>
        </nav>
        </>
    )
}

export default SidebarMenu

