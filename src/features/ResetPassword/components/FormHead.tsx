
import { Container } from '@mui/material';
import img from '../../../constants/img';
import {useHistory} from 'react-router-dom'

function FormHead() {
    const history = useHistory();
    return (
        <div
            className='for-head'
        >
            <Container>
                <div className="flex-row-sp for-head-cnt">
                    <div className="flex-row for-head-cnt__left">
                        <img onClick={()=>history.push('/')} src={img.beautyX} alt="" />
                        <span className="text">Đổi mật khẩu</span>
                    </div>
                    <div></div>
                </div>
            </Container>
        </div>
    );
}

export default FormHead;