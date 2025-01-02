import { useState } from 'react'
import './Arquivos.css'

const Arquivos = () => {

    const [categoria, setCategoria] = useState('')
    const [ano, setAno] = ('')
    const [nome, setNome] = ('')
    
    const handleInputCategoria = e => {
        setCategoria(e.target.valeu)
    }
    
    const handleInputAno = e => {
        setAno(e.target.value)
    }
    
    const handleInputNome = e => {
        setNome(e.target.value)
    }

    return(
        <div className='background-arquivos'>
            <h1 style={{color: 'black'}}>Lista de todos os arquivos</h1>
            <div className="background-arquivos-filtro">
                <div className="input-filtro">
                    <label htmlFor="">Categoria</label>
                    <select name="" id="" value={categoria} onChange={handleInputCategoria}>
                        <option value="">Escolha</option>
                        <option value="IP">IP</option>
                        <option value="TC">TC</option>
                        <option value="PAI">PAI</option>
                        <option value="CART PREC">Carta Precatoria</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <div className="input-filtro">
                    <label htmlFor="">Ano</label>
                    <input type="text" name="" id="input-ano" value={ano} onChange={handleInputAno} placeholder='2024' />
                </div>
                <div className="input-filtro">
                    <label htmlFor="">Nome</label>
                    <input type="text" name="" id="" value={nome} onChange={handleInputNome} placeholder='Digite o nome'/>
                </div>
            </div>
            <div className="tabela">
                <table>
                    <tr>
                        <th>Documento</th>
                        <th>Tipo</th>
                        <th>Última Alteração</th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>IP 905.24</td>
                        <td>IP</td>
                        <td>16/10/2024</td>
                    </tr>
                    <tr>
                        <td>PAI 915.23</td>
                        <td>PAI</td>
                        <td>10/05/2023</td>
                    </tr>
                    <tr>
                        <td>TC 901.24_compressed</td>
                        <td>TC</td>
                        <td>11/09/2024</td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Arquivos