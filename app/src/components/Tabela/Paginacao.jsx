import './Paginacao.css'
import avancar from '../../assets/chevron_right_24dp.svg'
import voltar from '../../assets/chevron_left_24dp.svg'
import voltarInicio from '../../assets/keyboard_double_arrow_left_24dp.svg'

const Paginacao = ({pageNumber, setPageNumber, totalPages}) => {

    return(
        <div className="background-paginacao">
            <button className="voltar-inicio" onClick={() => setPageNumber(1)} ><img src={voltarInicio} alt="" /></button>
            <button className="voltar" onClick={() => setPageNumber(prev => Math.max(prev-1, 1))} disabled={pageNumber === 1} ><img src={voltar} alt="" /></button>
            <p> {pageNumber} de {totalPages}</p>
            <button className="avancar" onClick={() => setPageNumber(prev => Math.min(prev+1, totalPages))} disabled={totalPages === pageNumber} ><img src={avancar} alt="" /></button>
        </div>
    )
}

export default Paginacao