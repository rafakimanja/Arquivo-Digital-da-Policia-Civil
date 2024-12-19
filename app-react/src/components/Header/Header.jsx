import usuario from '../../assets/account_circle_24dp_E8EAED_FILL0_wght200_GRAD0_opsz24.svg'
import './Header.css'

const Header = ({userLog}) => {
    return(
    <div className="header">
        <p>{userLog.nome}</p>
        <img src={usuario} alt=""/>
    </div>
)
}

export default Header