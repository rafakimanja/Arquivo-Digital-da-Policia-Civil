import './FiltrosAtivos.css'

const FiltrosAtivos = ({filtros, handleDelete}) =>{
    return(
        <>
            {
                filtros.map((filtro) => (
                    <div className="background-filtro-ativo">
                    <p> {filtro} </p>
                    <button onClick={() => handleDelete(filtro)} >X</button>
                    </div>
                ))
            }
        </>
    )
}

export default FiltrosAtivos