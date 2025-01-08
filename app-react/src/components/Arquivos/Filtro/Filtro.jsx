import './Filtro.css'
import { useState } from 'react'
import lupa from '../../../assets/search_24dp.svg'

const Filtro = () => {

    const [categoria, setCategoria] = useState('')
    const [ano, setAno] = useState('')
    const [nome, setNome] = useState('')
    
    const handleInputCategoria = e => {
        setCategoria(e.target.value)
    }
    
    const handleInputAno = e => {
        setAno(e.target.value)
    }
    
    const handleInputNome = e => {
        let nome = e.target.value
        setNome(nome.trim())
    }

    const handleFltroArq = () => {

        if(ano != ''){
            const regex = new RegExp('^[0-9]{4}$')

            if(!regex.test(ano)){
                alert('Informe um ano valido')
                return
            }
        }

        const filtro = {}
        filtro.nome = nome
        filtro.ano = ano
        filtro.categoria = categoria
    }

    return(
        <div className="background-arquivos-filtro">
                <div className="input-filtro">
                    <label htmlFor="">Categoria</label>
                    <select name="" id="" value={categoria} onChange={handleInputCategoria}>
                        <option value="">Escolha</option>
                        <option value="IP">IP</option>
                        <option value="TC">TC</option>
                        <option value="PAI">PAI</option>
                        <option value="Carta Precatoria">Cart Prec</option>
                        <option value="Outro">Outro</option>
                    </select>
                </div>
                <div className="input-filtro">
                    <label htmlFor="">Ano</label>
                    <input type="text" name="" id="input-ano" value={ano} onChange={handleInputAno} placeholder='2024' />
                </div>
                <div className="input-filtro" id='input-nome'>
                    <label htmlFor="">Nome</label>
                    <input type="text" name="" id="" value={nome} onChange={handleInputNome} placeholder='Digite o nome'/>
                </div>
                <div className="button-pesquisa">
                    <button onClick={() => (
                        handleFltroArq(),
                        setCategoria(''),
                        setAno(''),
                        setNome('')
                    )}>Pesquisar <img src={lupa} alt="" /></button>
                </div>
        </div>
    )
}

export default Filtro