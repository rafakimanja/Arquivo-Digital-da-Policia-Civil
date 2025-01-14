import Space from "./Space"
import PieGraph from "../graficos/PieGraph"
import BarGraph from "../graficos/BarGraph"
import { Link } from "react-router-dom"
import './Contents.css'

const Contents = ({userLog}) => {
    return(
        <>
        { 
            userLog.admin ? (
                <div className="spaces-admin">
                    {/* <div className="top-containers">
                        <Space contend={"Adicionar Arquivo"} img={"add"} />
                        <Space contend={"Buscar Arquivo"} img={"search"} />
                        <PieGraph/>
                    </div> */}
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
                    <Link to={"/index/form"}><Space contend={"Adicionar Arquivo"} img={"add"} /></Link>
                    <Link to={"/index/arquivos"}><Space contend={"Buscar Arquivo"} img={"search"} /></Link>
                </div>
            )
        }
        </>
    )
}

export default Contents