import { Link } from "react-router-dom";
import './Avisos.css'

const Avisos = ({ cadastro }) => {
    return (
        <div className="background-avisos">
            <h1 className="titulo">{cadastro ? "Cadastre-se" : "Recuperação de Senhas"}</h1>
            <div className="conteudo">
                {cadastro ? (
                    <>
                        <p>Para se cadastrar no Sistema de Arquivo Digital, envie um email para<span className="email">tidposorio@gmail.com </span>com o</p>
                        <p>assunto<b>'QUERO ME CADASTRAR'</b>com as seguintes informações:
                        </p>
                        <ul>
                            <li>Nome</li>
                            <li>RG</li>
                            <li>Senha</li>
                        </ul>
                        <p>Você receberá um email de confirmação do seu cadastro no sistema.</p>
                    </>
                ) : (
                    <>
                        <p>Para recuperar sua senha, envie um email para <span className="email" onClick={() => copiarEmail()} > tidposorio@gmail.com </span> com o  </p>
                        <p>assunto <b>'ESQUECI MINHA SENHA'</b> com as seguintes informações:</p>
                        <ul>
                            <li>Nome</li>
                            <li>RG</li>
                        </ul>
                        <p>Você receberá um email em resposta com sua senha.</p>
                    </>
                )}
            </div>
            <div className="botao-container">
                <Link to="/">
                    <button>Voltar</button>
                </Link>
            </div>
        </div>
    );
};

export default Avisos;

function copiarEmail() {
    const email = "tidposorio@gmail.com";
    
    navigator.clipboard.writeText(email)
        .then(() => alert("E-mail copiado para a área de transferência!"))
        .catch(err => console.error("Erro ao copiar o e-mail:", err));
}

