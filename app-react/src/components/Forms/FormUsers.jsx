import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FormUsers.css'

const FormUsers = () => {

    const [nomeUser, setNomeUser] = useState('')
    const [senhaUser, setSenhaUser] = useState('')
    const [confirmSenhaUser, setConfirmSenhaUser] = useState('')
    const [adminUser, setAdminUser] = useState(false)

    const handleNomeChange = e => {
        setNomeUser(e.target.value)
    }

    const handleSenhaChange = e => {
        setSenhaUser(e.target.value)
    }

    const handleSenhaConfirmChange = e => {
        setConfirmSenhaUser(e.target.value)
    }

    const handleAdminChange = e => {
        setAdminUser(e.target.value)
    }

    return(
            <>
                <div className="background-form-user">
                    <h1>Adicionar Usuario</h1>
                    <div className="input-form">
                        <label htmlFor="">Nome do Usuario:</label>
                        <input type="text" name="" id="" value={nomeUser} onChange={handleNomeChange} placeholder='Nome do usuario'/>
                    </div>
                    <div className="input-form">
                        <label htmlFor="">Senha:</label>
                        <input type="password" name="" id="" value={senhaUser} onChange={handleSenhaChange} placeholder='Digite a sennha'/>
                    </div>
                    <div className="input-form">
                        <label htmlFor="">Digite novamente a senha:</label>
                        <input type="password" name="" id="" value={confirmSenhaUser} onChange={handleSenhaConfirmChange} placeholder='Digite a senha novamente'/>
                    </div>
                    <div className="input-form" id='input-checkbox'>
                        <label htmlFor="">Admin:</label>
                        <input type="checkbox" name="" id="" value={adminUser} onChange={handleAdminChange} />
                    </div>
                    <div className="buttons-form">
                        <button className="salvar">Salvar</button>
                        <Link to={"/index/users"} ><button className='cancelar'>Cancelar</button></Link>
                    </div>
                </div>
            </>
    )
}

export default FormUsers