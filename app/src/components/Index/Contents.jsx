import Space from "./Space"
import { Link } from "react-router-dom"
import './Contents.css'

const Contents = ({userLog}) => {
    return(
        <>
        { 
            userLog.superuser ? (
                <div className="spaces-admin">
                    <div className="top-containers">
                        <Space contend={"Em Desenvolvimento!"} img={"warning"} />
                        <Space contend={"Em Desenvolvimento!"} img={"warning"} />
                        <Space contend={"Em Desenvolvimento!"} img={"warning"} />
                    </div>
                    <div className="bottom-containers">
                        <Space contend={"Em Desenvolvimento!"} img={"warning"} />
                    </div>
                </div>
            ) : (
                <div className="spaces">
                    <Link to={"/index/arquivos/new"}><Space contend={"Adicionar Arquivo"} img={"add"} /></Link>
                    <Link to={"/index/arquivos"}><Space contend={"Buscar Arquivo"} img={"search"} /></Link>
                </div>
            )
        }
        </>
    )
}

export default Contents