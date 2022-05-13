import React from 'react';
import { dealHot } from '../../../../constants/img';
import { useHistory } from 'react-router-dom';
import slugify from '../../../../utils/formatUrlString';
import scrollTop from '../../../../utils/scrollTop';

export const deals = [
    { id: 1, title: 'Deal hot từ 50-100k', min_price: 50000, max_price: 100000, img: dealHot.dealhot },
    { id: 2, title: 'Deal chăm sóc da làm đẹp Giảm 50%', min_price: null, img: dealHot.dealhot1, percent: 50 },
    { id: 3, title: 'Dịch vụ xâm lấn Giảm 30%', min_price: null, img: dealHot.dealhot2, percent: 30 }
]

function HomeDeal(props: any) {
    const history = useHistory();
    const gotoDetail = (item: any) => {
        scrollTop()
        history.push({
            pathname: `/deal/${slugify(item.title)}`,
            search: `${item.id}`
        })
    }
    return (
        <div className='home-deal-cnt'>
            <div
                onClick={() => gotoDetail(deals[0])}
                className="deal-first"
            >
                <img src={dealHot.dealhot} alt="" />
            </div>
            <div className="deal-second">
                <div
                    onClick={() => gotoDetail(deals[1])}
                    className="deal-second__item"
                >
                    <img src={dealHot.dealhot1} alt="" />
                </div>
                <div
                    onClick={() => gotoDetail(deals[2])}
                    className="deal-second__item"
                >
                    <img src={dealHot.dealhot2} alt="" />
                </div>
            </div>
        </div>
    );
}

export default HomeDeal;