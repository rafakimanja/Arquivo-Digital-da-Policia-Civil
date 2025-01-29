import { Link, Form, redirect, useLoaderData } from 'react-router-dom'
import './FormUsers.css'
import axios from 'axios'

const UpdateUsers = () => {

    const usuario = useLoaderData()

    return(
            <>
                {console.log(usuario)}
                <div className="background-form-user">
                    <h1>Dados do Usuario</h1>
                    <Form method='post'>
                        <div className="formulario-usuario">
                            <div className="input-form">
                                <label htmlFor="">Nome do Usuario:</label>
                                <input type="text" name="nome" id="" defaultValue={usuario.nome ? usuario.nome: ''} placeholder='Nome do usuario'/>
                            </div>
                            <div className="input-form">
                                <label htmlFor="">RG do Usuario:</label>
                                <input type="text" name="rg" id="" defaultValue={usuario.rg ? usuario.rg: ''} placeholder='RG do usuario'/>
                            </div>
                            <div className="input-form">
                                <label htmlFor="">Senha:</label>
                                <input type="password" name="senha" id="" placeholder='Digite a sennha'/>
                            </div>
                            <div className="input-form">
                                <label htmlFor="">Digite novamente a senha:</label>
                                <input type="password" name="senha-repeat" id="" placeholder='Digite a senha novamente'/>
                            </div>
                            <div className="input-form" id='input-checkbox'>
                                <label htmlFor="">Admin:</label>
                                <input type="checkbox" name="admin" id="" defaultChecked={usuario.admin} />
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

export default UpdateUsers

export async function getUsuario({params}) {
    const url = `http://localhost:5000/index/usuarios/${params.id}`
    const token = sessionStorage.getItem('authToken')
    try {
        const {data} = await axios.get(url, {headers: {
            'Authorization': `Bearer ${token}`
        }})
        return data
    } catch (error) {
        alert(error)
    }
    return null
}

export async function updateUsuario({request, params}) {
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
        const response = await axios.patch(`http://localhost:5000/index/usuarios/${params.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200){
            alert(`Usuario ${response.data.nome} alterado com sucesso!`)
        }
    } catch (error) {
        if (error.response) {
            if (error.response.status === 404) {
                Alert(`Erro 404: Não encontrado - ${JSON.stringify(error.response)}`);
            } else {
                Alert(`Erro no servidor: ${error.response.status}`);
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