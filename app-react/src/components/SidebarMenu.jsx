import "../components/SidebarMenu.css"
import { Link } from "react-router-dom"

const SidebarMenu = () => {
    return(
        <>
        <nav className="menu">
            <ul>
                <li className="icon-home"><Link to={"/index"}><span>Home</span></Link></li>
                <li className="icon-add"><span>Adicionar</span></li>
                <li className="icon-search"><Link to={"/index/arquivos"}><span>Pesquisar</span></Link></li>
                <li className="icon-settings"><span>Configurações</span></li>
                <li className="icon-users"><span>Usuários Cad.</span></li>
                <li className="icon-exit" id="exit"><Link to={"/"}><span>Sair</span></Link></li>
            </ul>
        </nav>
        </>
    )
}

export default SidebarMenu

