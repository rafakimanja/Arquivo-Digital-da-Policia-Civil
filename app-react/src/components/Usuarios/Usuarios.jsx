import FiltroUsers from "./Filtro/FiltroUsers"
import './Usuarios.css'

const Usuarios = () => {
    return(
        <div className="background-usuarios">
            <h1 style={{color: 'black'}} >Tela de Usuarios Cadastrados</h1>
            <FiltroUsers/>
        </div>
    )
}

export default Usuarios