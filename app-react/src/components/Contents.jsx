import Space from "./Space"
import PieGraph from "./PieGraph"
import BarGraph from "./BarGraph"
import './Contents.css'

const Contents = ({admin}) => {
    return(
        <div className="spaces">
            <div className="top-containers">
                <Space contend={"Adicionar Arquivo"} img={"add"} />
                <Space contend={"Buscar Arquivo"} img={"search"} />
                <PieGraph/>
            </div>
            <div className="bottom-containers">
                <BarGraph/>
            </div>
        </div>
    )
}

export default Contents