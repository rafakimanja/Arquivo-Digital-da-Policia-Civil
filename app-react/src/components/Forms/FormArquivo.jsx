import { useState } from 'react'
import './FormArquivo.css'
import { Link } from 'react-router-dom'

const FormArquivo = () => {

    const [nomeArq, setNomeArq] = useState('')
    const [tipoArq, setTipoArq] = useState('')

    const handleNomeChange = e => {
        setNomeArq(e.target.value)
    }

    const handleTipoChange = e => {
        setTipoArq(e.target.value)
    }

    const handleFormArq = () => {
        
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
                <input type="file" name="arquivo" id="arquivo"/>
            </div>
            <div className="buttons-form">
                <button className="salvar" onClick={handleFormArq}>Salvar</button>
                <Link to={"/index"}><button className="cancelar">Cancelar</button></Link>
            </div>
        </div>
    </>
    )
}

export default FormArquivo