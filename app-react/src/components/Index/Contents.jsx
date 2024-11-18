import Space from "./Space"
import PieGraph from "../graficos/PieGraph"
import BarGraph from "../graficos/BarGraph"
import { Link } from "react-router-dom"
import './Contents.css'

const Contents = ({userLog}) => {
    return(
        <>
        { 
            userLog.current?.superuser ? (
                <div className="spaces-admin">
                    <div className="top-containers">
                        <Space contend={"Adicionar Arquivo"} img={"add"} />
                        <Space contend={"Buscar Arquivo"} img={"search"} />
                        <PieGraph/>
                    </div>
                    <div className="bottom-containers">
                        <BarGraph/>
                    </div>
                </div>
            ) : (
                <div className="spaces">
                    <Space contend={"Adicionar Arquivo"} img={"add"} />
                    <Link to={"/index/arquivos"}><Space contend={"Buscar Arquivo"} img={"search"} /></Link>
                </div>
            )
        }
        </>
    )
}

export default Contents