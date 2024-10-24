import { useState } from 'react'
import logoPolicia from '../assets/Logo-PC.png'
import olhoVisivel from '../assets/olho-aberto2.svg'
import olhoInvisivel from '../assets/olho-fechado.svg'
import './FormLogin.css'

const FormLogin = () => {

    const [eyerVisibel, setEyerVisibel] = useState(false)

    const toggleEye = () => {
        setEyerVisibel(!eyerVisibel)
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
                        <input type="text" name="" id=""  required/>
                        <label htmlFor="">RG</label>
                    </div>
                    <div className='input-group'>
                        <input type={eyerVisibel ? "text" : "password"} name="" id="input-senha"  required />
                        <label htmlFor="">SENHA</label>
                        <img src={eyerVisibel ? olhoVisivel : olhoInvisivel} alt="" className='eye-icon' onClick={toggleEye} />
                    </div>
                    <a href="#">Esqueceu a Senha?</a>
                    <div className='button-group'>
                        <button type="submit">ENTRAR</button>
                        <button id='cadastro'>CADASTRAR</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormLogin