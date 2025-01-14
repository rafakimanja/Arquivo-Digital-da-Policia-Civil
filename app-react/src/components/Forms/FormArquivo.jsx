import { useState } from 'react'
import './FormArquivo.css'
import { Link } from 'react-router-dom'

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

    const handleFormArq = () => {

        const regex = new RegExp('^[0-9]{4}$')

        if(nomeArq === ''){
            alert('Informe o nome do arquivo!')
            return
        }

        if(!regex.test(anoArq)){
            alert('Informe um ano valido')
            return
        }

        if(tipoArq === ''){
            alert('Escolha o tipo do arquivo!')
            return
        }

        if(arq == null){
            alert('Nenhum arquivo foi selecionado!')
            return
        }
    }

    return(
    <>
        <div className="background-form-arq">
            <h1>Adiconar Arquivo</h1>
            <div className="input-form">
                <label htmlFor="">Nome do Arquivo:</label>
                <input type="text" name="" id="" placeholder="Nome do Arquivo" value={nomeArq} onChange={handleNomeChange} />
            </div>
            <div className="input-form">
                <label htmlFor="">Ano:</label>
                <input type="text" name="" id="input-ano" placeholder='Informe o ano' value={anoArq} onChange={handleAnoChange} />
            </div>
            <div className="input-form">
                <label htmlFor="">Tipo de Arquivo:</label>
                <select name="" id="" value={tipoArq} onChange={handleTipoChange} >
                    <option value="">Escolha</option>
                    <option value="IP">IP</option>
                    <option value="Tc">TC</option>
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
                <button className="salvar" onClick={() => (
                    handleFormArq(),
                    setNomeArq(''),
                    setAnoArq(''),
                    setTipoArq(''),
                    setArq(null)
                    )}>Salvar</button>
                <Link to={"/index"}><button className="cancelar">Cancelar</button></Link>
            </div>
        </div>
    </>
    )
}

export default FormArquivo