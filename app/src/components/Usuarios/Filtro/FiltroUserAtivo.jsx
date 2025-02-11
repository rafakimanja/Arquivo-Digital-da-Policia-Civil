import './FiltroUserAtivo.css'


const FiltroUserAtivo = ({content, handleDelete}) => {
    return(
        <div className="background-filtro-user">
            <p> {content} </p>
            <button onClick={() => handleDelete()} >X</button>
        </div>
    )
}

export default FiltroUserAtivo