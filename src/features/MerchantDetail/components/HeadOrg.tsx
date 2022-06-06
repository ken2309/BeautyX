import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import icon from '../../../constants/icon';
import { IOrganization } from '../../../interface/organization';
import { onDeleteFavoriteOrg, onFavoriteOrg } from '../../../redux/org/orgSlice';

interface IProps {
    org: IOrganization
}

// onload event
window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    const de_header = document.querySelector(".mb-head-org-cnt");
    const windowPosition = scrolled > 80;
    if (de_header) {
        de_header.classList.toggle("mb-head-act", windowPosition);
    }
});

function HeadOrg(props: IProps) {
    const { USER } = useSelector((state: any) => state.USER);
    const history = useHistory();
    const { org } = props;
    const dispatch = useDispatch();
    const handleFavoriteOrg = () => {
        if (USER) {
            if (org?.is_favorite) {
                dispatch(onDeleteFavoriteOrg(org))
            } else {
                dispatch(onFavoriteOrg(org))
            }
        } else {
            history.push('/sign-in?1')
        }
    }
    return (
        <div className='flex-row-sp mb-head-org-cnt' >
            <div className="mb-head-org-cnt__left">
                <button
                    onClick={() => history.goBack()}
                >
                    <div className="icon-btn">
                        <img src={icon.chevronLeft} alt="" />
                    </div>
                </button>
            </div>
            <div className="mb-head-org-cnt__right">
                <button>
                    <div className="icon-btn">
                        <img src={icon.searchPurple} alt="" />
                    </div>
                </button>
                <button
                    onClick={() => history.push('/cart')}
                >
                    <div className="icon-btn">
                        <img src={icon.ShoppingCartSimple} alt="" />
                    </div>
                </button>
                <button
                    onClick={handleFavoriteOrg}
                >
                    <div className="icon-btn">
                        <img src={org?.is_favorite ? icon.heart : icon.unHeart} alt="" />
                    </div>
                </button>
            </div>
        </div>
    );
}

export default HeadOrg;