import {handleSubiz} from '../../utils/customChat';
import './style.css';
import icon from '../../constants/icon';


export default function chatBox(){
    return(
        <div className="support_chat_icon"onClick={handleSubiz}>
            <img className="chat_ico" src={icon.supportChat} alt=""/>
        </div>
    )
}