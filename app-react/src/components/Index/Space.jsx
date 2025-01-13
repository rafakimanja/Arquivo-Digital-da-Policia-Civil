import './Space.css'
import search from '../../assets/search_24dp.svg'
import add from '../../assets/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import warning from '../../assets/warning_24dp.svg'

const Space = ({contend, img}) => {

    const images = {warning, add, search}

    return(
        <div className="field-area">
            <p>{contend}</p>
            <img src={images[img]} alt="" className='icon' /> 
        </div>
    )
}

export default Space