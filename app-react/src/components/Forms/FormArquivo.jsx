import './FormArquivo.css'

const FormArquivo = () => {
    return(
    <>
        <div className="background-form-arq">
            <h1>Adiconar Arquivo</h1>
            <div className="input-form">
                <label htmlFor="">Nome do Arquivo:</label>
                <input type="text" name="" id="" placeholder="Nome do Arquivo"/>
            </div>
            <div className="input-form">
                <label htmlFor="">Tipo de Arquivo:</label>
                <select name="" id="">
                    <option value="">Escolha</option>
                    <option value="">IP</option>
                    <option value="">TC</option>
                    <option value="">PAI</option>
                    <option value="">Cart Prec</option>
                    <option value="">Outro</option>
                </select>
            </div>
            <div className="input-form">
                <label htmlFor="arquivo" className='label-busca'>Buscar</label>
                <input type="file" name="arquivo" id="arquivo"/>
            </div>
            <div className="buttons-form">
                <button className="salvar">Salvar</button>
                <button className="cancelar">Cancelar</button>
            </div>
        </div>
    </>
    )
}

export default FormArquivo