import { useState } from 'react'
import './Configuracoes.css'

const Configuracoes = () => {

    const [type, setType] = useState('')
    const [only, setOnly] = useState('')

    const handleInputType = e => {
        setType(e.target.value)
    }

    const handleSelectOnly = e => {
        setOnly(e.target.value)
    }

    return(
        <>
        <h1 id='title-config'>Configurações do Sistema</h1>
            <div className="background-config">
                <div className="input-config">
                    <label htmlFor="">Tipo de Arquivo</label>
                    <select name="" id="select-config" value={type} onChange={handleInputType}>
                        <option value="">Escolha</option>
                        <option value="txt">TXT</option>
                        <option value="pdf">PDF</option>
                        <option value="xlxs">XLSX</option>
                    </select>
                </div>
                <div className="input-config">
                    <label htmlFor="checkbox-only">Upload de Arquivo Único</label>
                    <input type="checkbox" id="input-text-config" name="only" value={only} onChange={handleSelectOnly} />
                </div>
                <div className="botao-salvar">
                    <button className="salvar">Salvar</button>
                </div>
            </div>
        </>
    )
}

export default Configuracoes