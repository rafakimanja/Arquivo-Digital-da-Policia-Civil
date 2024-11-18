import './Space.css'
import search from '../../assets/search_24dp_E8EAED_FILL0_wght200_GRAD0_opsz24.svg'
import add from '../../assets/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'

const Space = ({contend, img}) => {

    return(
        <div className="field-area">
            <p>{contend}</p>
            {
                img == "search" ? <img src={search} alt="" className='icon' /> : <img src={add} alt="" className='icon' />
            }
        </div>
    )
}

export default Space