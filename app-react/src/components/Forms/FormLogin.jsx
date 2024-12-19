import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoPolicia from '../../assets/Logo-PC.png'
import olhoVisivel from '../../assets/olho-aberto2.svg'
import olhoInvisivel from '../../assets/olho-fechado.svg'
import './FormLogin.css'

const FormLogin = ({login, setUserLog}) => {

    const navigate = useNavigate()
    const [eyerVisibel, setEyerVisibel] = useState(false)
    const [inputRG, setInputRG] = useState("")
    const [inputSenha, setInputSenha] = useState("")

    const toggleEye = () => {
        setEyerVisibel(!eyerVisibel)
    }

    const handleLogin = () => {

        const usuario = login(inputRG, inputSenha)

        if (usuario != undefined) {
            console.log(usuario)
            setUserLog(usuario)
            navigate("/index")
        }else alert("Login Invalido!")

        setInputSenha("")
        setInputRG("")
    }

    const handleInputRGChange = e => {
        setInputRG(e.target.value)
    }

    const handleInputSenhaChange = e => {
        setInputSenha(e.target.value)
    }

    return (
        <div className='background'>
            <div className='div-image'>
                <img src={logoPolicia} alt="" />
            </div>
            <div className='div-form'>
                <h2>Login</h2>
                <form action="#" method="post">
                    <div className='input-group'>
                        <input type="text" name="" id="" value={inputRG} onChange={handleInputRGChange}  required/>
                        <label htmlFor="">RG</label>
                    </div>
                    <div className='input-group'>
                        <input type={eyerVisibel ? "text" : "password"} name="" id="input-senha" value={inputSenha} onChange={handleInputSenhaChange}  required />
                        <label htmlFor="">SENHA</label>
                        <img src={eyerVisibel ? olhoVisivel : olhoInvisivel} alt="" className='eye-icon' onClick={toggleEye} />
                    </div>
                    <a href="#">Esqueceu a Senha?</a>
                    <div className='button-group'>
                        <button type="submit" onClick={handleLogin}>ENTRAR</button>
                        <button id='cadastro'>CADASTRAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormLogin