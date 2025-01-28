import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import { Form, useActionData, useNavigate } from 'react-router-dom'
import logoPolicia from '../../assets/Logo-PC.png'
import olhoVisivel from '../../assets/olho-aberto2.svg'
import olhoInvisivel from '../../assets/olho-fechado.svg'
import './FormLogin.css'

const FormLogin = ({setUserLog}) => {

    const [eyerVisibel, setEyerVisibel] = useState(false)
    const [inputRG, setInputRG] = useState("")
    const [inputSenha, setInputSenha] = useState("")

    const actionData = useActionData()
    const navigate = useNavigate()

    useEffect(() => {
        if (actionData?.token) {
            const user = jwtDecode(actionData.token)
            setUserLog(user)
            navigate("/index")
        }
    }, [actionData, setUserLog])

    const toggleEye = () => {
        setEyerVisibel(!eyerVisibel)
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
                <Form method='post' onSubmit={() => {setInputRG(''), setInputSenha('')}}>
                    <div className='input-group'>
                        <input type="text" name="rg" id="" value={inputRG} onChange={handleInputRGChange}  required/>
                        <label htmlFor="">RG</label>
                    </div>
                    <div className='input-group'>
                        <input type={eyerVisibel ? "text" : "password"} name="senha" id="input-senha" value={inputSenha} onChange={handleInputSenhaChange}  required />
                        <label htmlFor="">SENHA</label>
                        <img src={eyerVisibel ? olhoVisivel : olhoInvisivel} alt="" className='eye-icon' onClick={toggleEye} />
                    </div>
                    <a href="#">Esqueceu a Senha?</a>
                    <div className='button-group'>
                        <button type="submit">ENTRAR</button>
                        <button id='cadastro'>CADASTRAR</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default FormLogin

export async function loginUser({request}){
    const data = await request.formData()
    const login = {
        rg: data.get('rg'),
        senha: data.get('senha')
    }
    try {
        const response = await axios.post('http://localhost:5000/login', login)
        alert(response.data.message)
        sessionStorage.setItem('authToken', response.data.token)
        return {token: response.data.token}
    } catch (error) {
        if(error.response.status == 404){
            alert(error.response.data.message)
        }
        return {error: error}
    }
}