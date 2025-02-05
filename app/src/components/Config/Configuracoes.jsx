import { Form, redirect, useLoaderData } from 'react-router-dom'
import axios from 'axios'
import './Configuracoes.css'

const Configuracoes = () => {

    const config = useLoaderData()

    return(
        <>
        <h1 id='title-config'>Configurações do Sistema</h1>
            <div className="background-config">
                <Form method='post'>
                    <div className="input-config">
                        <label htmlFor="">Tipo de Arquivo</label>
                        <select name="extensao" defaultValue={config.tipo_arq ? config.tipo_arq : ''}>
                            <option value="">Escolha</option>
                            <option value="txt">TXT</option>
                            <option value="pdf">PDF</option>
                            <option value="xlxs">XLSX</option>
                        </select>
                    </div>
                    <div className="input-config">
                        <label htmlFor="checkbox-only">Upload de Arquivo Único</label>
                        <input type="checkbox" name="unico" defaultChecked={config.upload_unico}/>
                    </div>
                    <div className="botao-salvar">
                        <button className="salvar">Salvar</button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default Configuracoes

export async function getConfig() {
    const url = 'http://localhost:5000/index/config'
    const token = sessionStorage.getItem('authToken')
    const {data} = await axios.get(url, {headers: {
        'Authorization': `Bearer ${token}`
    }})
    return data
}

export async function addConfig({request}) {
    const data = await request.formData()
    const dadosForm = {
        tipo_arq: data.get('extensao'),
        upload_unico: Boolean(data.get('unico')),
    }

    const token = sessionStorage.getItem('authToken')

    try {
        checkForm(dadosForm)

        const response = await axios.post('http://localhost:5000/index/config', dadosForm, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status === 200){
            alert(`Configuracoes definidas com sucesso!`)
        }
    } catch (error) {
        if (error.response) {
                alert(`Erro: - Erro ao salvar as configuracoes`);
        } else {
            alert(error)
        }
    }
    return redirect("/index")
}

function checkForm(dados){
    if (dados.tipo_arq === '')
        throw new Error('Definifa um tipo de arquivo!')
}