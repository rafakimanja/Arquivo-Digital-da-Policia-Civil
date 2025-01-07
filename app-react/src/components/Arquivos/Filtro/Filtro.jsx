import './Filtro.css'
import { useState } from 'react'
import lupa from '../../../assets/search_24dp.svg'

const Filtro = () => {

    const [categoria, setCategoria] = useState('')
    const [ano, setAno] = useState('')
    const [nome, setNome] = useState('')
    
    const handleInputCategoria = e => {
        setCategoria(e.target.valeu)
    }
    
    const handleInputAno = e => {
        setAno(e.target.value)
    }
    
    const handleInputNome = e => {
        setNome(e.target.value)
    }

    const handleFltroArq = () => {

        const filtro = {}

        if(categoria != ''){
            filtro.categoria = categoria
        }else{
            filtro.categoria = ""
        }

        if(ano != ''){
            const regex = new RegExp('^[0-9]{4}$')

            if(!regex.test(ano)){
                alert('Informe um ano valido')
                return
            }
            filtro.ano = ano
        }else{
            filtro.ano = ""
        }

        if(nome != ''){
            filtro.nome = nome
        }else{
            filtro.nome = ""
        }

        alert(JSON.stringify(filtro))
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
                        <option value="CART PREC">Carta Precatoria</option>
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