import { useState } from 'react'
import { Link, Form, redirect } from 'react-router-dom'
import './FormUsers.css'
import axios from 'axios'

const FormUsers = () => {

    const [nomeUser, setNomeUser] = useState('')
    const [rgUser, setRgUser] = useState('')
    const [senhaUser, setSenhaUser] = useState('')
    const [confirmSenhaUser, setConfirmSenhaUser] = useState('')
    const [adminUser, setAdminUser] = useState(false)

    const handleNomeChange = e => {
        let nome = e.target.value
        setNomeUser(nome.trim())
    }

    const handleRgChange = e => {
        setRgUser(e.target.value)
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

    return(
            <>
                <div className="background-form-user">
                    <h1>Adicionar Usuario</h1>
                    <Form method='post' onSubmit={() => {setNomeUser(''), setRgUser(''), setSenhaUser(''), setConfirmSenhaUser(''), setAdminUser(false)}}>
                        <div className="formulario-usuario">
                            <div className="input-form">
                                <label htmlFor="">Nome do Usuario:</label>
                                <input type="text" name="nome" id="" value={nomeUser} onChange={handleNomeChange} placeholder='Nome do usuario'/>
                            </div>
                            <div className="input-form">
                                <label htmlFor="">RG do Usuario:</label>
                                <input type="text" name="rg" id="" value={rgUser} onChange={handleRgChange} placeholder='RG do usuario'/>
                            </div>
                            <div className="input-form">
                                <label htmlFor="">Senha:</label>
                                <input type="password" name="senha" id="" value={senhaUser} onChange={handleSenhaChange} placeholder='Digite a sennha'/>
                            </div>
                            <div className="input-form">
                                <label htmlFor="">Digite novamente a senha:</label>
                                <input type="password" name="senha-repeat" id="" value={confirmSenhaUser} onChange={handleSenhaConfirmChange} placeholder='Digite a senha novamente'/>
                            </div>
                            <div className="input-form" id='input-checkbox'>
                                <label htmlFor="">Admin:</label>
                                {
                                    !adminUser ? <input type="checkbox" name="admin" id="" value={adminUser} onChange={handleAdminChange} /> : <input type="checkbox" name="admin" id="" value={adminUser} onChange={handleAdminChange} checked />
                                }
                            </div>
                        </div>
                        <div className="buttons-form">
                            <button className="salvar" type='submit'>Salvar</button>
                            <Link to={"/index/users"} ><button className='cancelar'>Cancelar</button></Link>
                        </div>
                    </Form>
                </div>
            </>
    )   
}

export default FormUsers

export async function addUser({request}) {
    const data = await request.formData()
    const dadosForm = {
        nome: data.get('nome'),
        senha1: data.get('senha'),
        senha2: data.get('senha-repeat'),
        rg: data.get('rg'),
        admin: data.get('admin')
    }

    const token = sessionStorage.getItem('authToken')

    try {
        checkForm(dadosForm)
        const data = {
            nome: dadosForm['nome'],
            senha: dadosForm['senha1'],
            rg: dadosForm['rg'],
            admin: Boolean(dadosForm['admin']) 
        }
        const response = await axios.post('http://localhost:5000/index/usuarios/form', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200){
            alert(`Usuario ${response.data.nome} adicionado com sucesso!`)
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                alert(`Erro 404: Não encontrado - ${JSON.stringify(error.response)}`);
            } else {
                alert(`Erro no servidor: ${error.response.status}`);
            }
        } else {
            alert(error)
        }
    }
    return redirect("/index/users")
}

function checkForm (dados){

    const regex = new RegExp('^[0-9]{10}$')

    if(dados.nome === ''){
        throw new Error('Informe o nome do usuario!')
    }

    if(dados.rg === '' || !regex.test(dados.rg)){
        throw new Error('Informe um RG válido!')
    }

    if(dados.senha1 === ''){
        throw new Error('Informe a senha!')
    }

    if(dados.senha2 === ''){
        throw new Error('Informe a senha novamente!')
    }

    if(dados.senha1 != dados.senha2){
        throw new Error('As senhas não coincidem')
    }
}