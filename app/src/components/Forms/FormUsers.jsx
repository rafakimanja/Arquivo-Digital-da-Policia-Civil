import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FormUsers.css'

const FormUsers = () => {

    const [nomeUser, setNomeUser] = useState('')
    const [senhaUser, setSenhaUser] = useState('')
    const [confirmSenhaUser, setConfirmSenhaUser] = useState('')
    const [adminUser, setAdminUser] = useState(false)

    const handleNomeChange = e => {
        let nome = e.target.value
        setNomeUser(nome.trim())
    }

    const handleSenhaChange = e => {
        setSenhaUser(e.target.value)
    }

    const handleSenhaConfirmChange = e => {
        setConfirmSenhaUser(e.target.value)
    }

    const handleAdminChange = e => {
        setAdminUser(e.target.checked)
    }

    const handleSubmitForm = () => {

        if(nomeUser === ''){
            alert('Informe o nome do usuario!')
            return
        }

        if(senhaUser === ''){
            alert('Informe a senha!')
            return
        }

        if(confirmSenhaUser === ''){
            alert('Informe a senha novamente!')
            return
        }

        if(senhaUser != confirmSenhaUser){
            alert('As senhas não coincidem')
            return
        }

        const usuario = {
            nome: nomeUser,
            senha: senhaUser,
            admin: adminUser
        }

        alert(JSON.stringify(usuario))
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
                        {
                            !adminUser ? <input type="checkbox" name="" id="" value={adminUser} onChange={handleAdminChange} /> : <input type="checkbox" name="" id="" value={adminUser} onChange={handleAdminChange} checked />
                        }
                    </div>
                    <div className="buttons-form">
                        <button className="salvar" onClick={() => (
                            handleSubmitForm(),
                            setNomeUser(''),
                            setSenhaUser(''),
                            setConfirmSenhaUser(''),
                            setAdminUser(false)
                        )} >Salvar</button>
                        <Link to={"/index/users"} ><button className='cancelar'>Cancelar</button></Link>
                    </div>
                </div>
            </>
    )
}

export default FormUsers