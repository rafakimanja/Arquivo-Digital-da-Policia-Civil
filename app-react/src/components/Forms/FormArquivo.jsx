import { useState } from 'react'
import './FormArquivo.css'
import { Link } from 'react-router-dom'

const FormArquivo = () => {

    const [nomeArq, setNomeArq] = useState('')
    const [tipoArq, setTipoArq] = useState('')
    const [anoArq, setAnoArq] = useState('')
    const [arq, setArq] = useState(null)

    const handleNomeChange = e => {
        setNomeArq(e.target.value)
    }

    const handleTipoChange = e => {
        setTipoArq(e.target.value)
    }

    const handleAnoChange = e => {
        setAnoArq(e.target.value)
    }

    const handleArqChange = e => {
        setArq(e.target.files[0])
    }

    const handleFormArq = () => {
        const regex = new RegExp('^[0-9]{4}$')
        if(regex.test(anoArq)){
            alert(anoArq)
        }else{
            alert('Informe um ano valido')
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
                    <option value="Cartorio Distribuidor">Cart Prec</option>
                    <option value="Outro">Outro</option>
                </select>
            </div>
            <div className="input-form">
                <label htmlFor="arquivo" className='label-busca'>Buscar</label>
                <input type="file" name="arquivo" id="arquivo" onChange={handleArqChange} />
                <span>Arquivos Selecionados: {arq ? arq.name : "Nenhum arquivo selecionado"}</span>
            </div>
            <div className="buttons-form">
                <button className="salvar" onClick={() => (
                    handleFormArq(),
                    setAnoArq('')
                    )}>Salvar</button>
                <Link to={"/index"}><button className="cancelar">Cancelar</button></Link>
            </div>
        </div>
    </>
    )
}

export default FormArquivo