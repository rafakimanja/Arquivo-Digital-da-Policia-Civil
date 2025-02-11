import { useState } from 'react'
import { Link, Form, redirect } from 'react-router-dom'
import axios from 'axios'
import './FormArquivo.css'

const FormArquivo = () => {

    const [nomeArq, setNomeArq] = useState('')
    const [tipoArq, setTipoArq] = useState('')
    const [anoArq, setAnoArq] = useState('')
    const [arq, setArq] = useState(null)

    const handleNomeChange = e => {
        let nome = e.target.value
        setNomeArq(nome.trim())
    }

    const handleTipoChange = e => {
        setTipoArq(e.target.value)
    }

    const handleAnoChange = e => {
        setAnoArq(e.target.value)
    }

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
            <h1>Adiconar Arquivo</h1>
            <Form method='post' encType='multipart/form-data' onSubmit={() => {setNomeArq(''), setAnoArq(''), setTipoArq(''), setArq(null)}}>
                <div className="input-form">
                    <label htmlFor="">Nome do Arquivo:</label>
                    <input type="text" name="nome" id="" placeholder="Nome do Arquivo" value={nomeArq} onChange={handleNomeChange} />
                </div>
                <div className="input-form">
                    <label htmlFor="">Ano:</label>
                    <input type="text" name="ano" id="input-ano" placeholder='Informe o ano' value={anoArq} onChange={handleAnoChange} />
                </div>
                <div className="input-form">
                    <label htmlFor="">Tipo de Arquivo:</label>
                    <select name="categoria" id="" value={tipoArq} onChange={handleTipoChange} >
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
                    <input type="file" name="arquivo" id="arquivo" onChange={handleArqChange} />
                    <span>{arq ? arq.name : ''}</span>
                </div>
                <div className="buttons-form">
                    <button className="salvar" type='submit'>Salvar</button>
                    <Link to={"/index"}><button className="cancelar">Cancelar</button></Link>
                </div>
            </Form>
        </div>
    </>
    )
}

export default FormArquivo

export async function addArquivo({request}) {
    const data = await request.formData()
    const token = sessionStorage.getItem('authToken')

    try {
        checkForm(data.get('nome'), data.get('ano'), data.get('categoria'), data.get('arquivo'))
        const obj = {
            nome: data.get('nome'),
            ano: data.get('ano'),
            categoria: data.get('categoria'),
            arquivo: data.get('arquivo')
        }
        const response = await axios.post('http://localhost:5000/index/documentos', data, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        alert(response.data.message)
        return redirect('/index/arquivos')
    } catch(error) {
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

    if(!arquivo || !(arquivo instanceof File)){
        throw new Error('Selecione um arquivo valido!')
    }
}