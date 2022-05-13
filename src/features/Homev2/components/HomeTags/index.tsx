import React, { useContext } from 'react';
import { imgTag } from '../../../../constants/img';
import '../../home-se.css';
import HomeTitleSection from '../HomeTitleSection/index';
import { useHistory } from 'react-router-dom'
import { AppContext } from '../../../../context/AppProvider';

function HomeTags(props: any) {
    const history = useHistory();
    const { t } = useContext(AppContext)
    const tags = [
        { id: 1, title: 'Nail', text: "Nail", img: imgTag.nails },
        { id: 2, title: 'Phòng khám', text: t("home_2.clinic"), img: imgTag.nhaKhoa },
        { id: 3, title: 'Salon', text: "Salon", img: imgTag.hairSalon },
        { id: 4, title: 'Spa', text: "Spa", img: imgTag.spa },
        { id: 5, title: 'Thẩm mỹ viện', text: t("home_2.beauty_salon"), img: imgTag.skinCare },
        { id: 6, title: 'Message Center', text: "Message Center", img: imgTag.message },
        //{ id: 7, title: 'Yoga', img: imgTag.yoga },
    ]
    const gotoDetail = (tag: string) => {
        history.push({
            pathname: '/danh-muc/',
            search: `${tag}`
        })
    }
    return (
        <>
            <HomeTitleSection
                title={`${t("home_2.categories")}`}
            />
            <div className='home-tags'>
                <ul className="home-tags-list">
                    {
                        tags.map(item => (
                            <li
                                onClick={() => gotoDetail(item.title)}
                                key={item.id}
                            >
                                <div className="flex-column tag-item-cnt">
                                    <img src={item.img} alt="" />
                                    <span>{item.text}</span>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    );
}

export default HomeTags;