import Skeleton from 'react-loading-skeleton'
import img from '../../constants/img'
import './style.css'

export const LoadHomeBanner = () => {
    return (
        <>
            <div className="load-home-banner">
                <div className="load-home-banner__img">
                    <img src={img.bannerBlur} alt="" />
                </div>
                <div className="load-home-banner__right">
                    <div className="top">

                    </div>
                    <div className="flex-row-sp bot">
                        <div style={{ backgroundColor: "#FFF3E1" }} className="item"></div>
                        <div style={{ backgroundColor: "#E2E0F1" }} className="item"></div>
                    </div>
                </div>
            </div>
            <div className="load-home-tag">
                <ul className="tag-list">
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <li key={i} className="item">
                                <Skeleton width="100%" height="100%" />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}