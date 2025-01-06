import { useState } from "react";
import lupa from '../../../assets/search_24dp.svg'
import './FiltroUsers.css'

const FiltroUsers = () => {

    const [userName, setUserName] = useState('')

    const handleInputNameUser = e => {
        setUserName(e.target.value)
    }

    return(
       <div className="background-filtroUsers">
            <input type="text" name="" id="" value={userName} onChange={handleInputNameUser} placeholder="Pesquisar nome usuario"/>
            <button className="search-button">Buscar <img src={lupa} alt=""/></button>
            <button className="add-button">Adicionar</button>
       </div>
    )
}

export default FiltroUsers