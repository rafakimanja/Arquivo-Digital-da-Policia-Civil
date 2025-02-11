import { Link, Form, redirect, useLoaderData } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import './FormArquivo.css'

const UpdateArquivo = () => {

    const arquivo = useLoaderData()
    const [arq, setArq] = useState(null)

    const handleArqChange = e => {
        let arquivo = e.target.files[0]
        if(arquivo.size > 10_485_760){
            alert('Tamanho de maximo de arquivo ultrapassado! Limite de 10Mb')
        }else{
            setArq(arquivo)
        }
    }

    return(
    <>
        <div className="background-form-arq">
            <h1>Dados do Arquivo</h1>
            <Form method='post' encType='multipart/form-data'>
                <div className="input-form">
                    <label htmlFor="">Nome do Arquivo:</label>
                    <input type="text" name="nome" id="" placeholder="Nome do Arquivo" defaultValue={arquivo.nome ? arquivo.nome : ''}/>
                </div>
                <div className="input-form">
                    <label htmlFor="">Ano:</label>
                    <input type="text" name="ano" id="input-ano" placeholder='Informe o ano' defaultValue={arquivo.ano ? arquivo.ano : ''} />
                </div>
                <div className="input-form">
                    <label htmlFor="">Tipo de Arquivo:</label>
                    <select name="categoria" id="" defaultValue={arquivo.categoria ? arquivo.categoria : ''} >
                        <option value="">Escolha</option>
                        <option value="IP">IP</option>
                        <option value="TC">TC</option>
                        <option value="PAI">PAI</option>
                        <option value="Carta Precatoria">Cart Prec</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <div className="input-form">
                    <label htmlFor="arquivo" className='label-busca'>Buscar</label>
                    <input type="file" name="arquivo" id="arquivo" onChange={handleArqChange}/>
                    <span defaultValue={arquivo.arquivo ? arquivo.arquivo : ''}>{arq ? arq.name : ''}</span>
                </div>
                <div className="buttons-form">
                    <button className="salvar" type='submit'>Salvar</button>
                    <Link to={"/index/arquivos"}><button className="cancelar">Cancelar</button></Link>
                </div>
            </Form>
        </div>
    </>
    )
}

export default UpdateArquivo

export async function getArquivo({params}) {
    const url = `http://localhost:5000/index/documentos/${params.id}`
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

export async function updateArquivo({request, params}) {
    const data = await request.formData()
    const token = sessionStorage.getItem('authToken')

    try {
        checkForm(data.get('nome'), data.get('ano'), data.get('categoria'), data.get('arquivo'))
        const response = await axios.put(`http://localhost:5000/index/documentos/${params.id}`, data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        alert(response.data.message)
        return redirect('/index/arquivos')
    } catch(error) {
        console.log(error)
        if(error.response){
            alert(`Status Code: ${error.response.status} | ${error.response.data.erro}`)
        } else {
            alert(error)
        }
        return null
    }
}

function checkForm(nome, ano, categoria, arquivo){
    const regex = new RegExp('^[0-9]{4}$')

    if(nome === ''){
        throw new Error('Informe o nome do arquivo!')
    }

    if(!regex.test(ano)){
        throw new Error('Informe um ano valido')
    }

    if(categoria === ''){
        throw new Error('Informe uma categoria valida')
    }

    if (!(arquivo instanceof File)){
        throw new Error('Selecione um arquivo valido!')
    }
}