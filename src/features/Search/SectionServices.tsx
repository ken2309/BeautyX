import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { IServicePromo } from '../../interface/servicePromo';
import ServiceResultItem from './components/ServiceResultItem';
import { onSetTabResult } from '../../redux/search/searchResultSlice';
import { onToggleSearchCnt } from '../../redux/search/searchSlice'
import { AppContext } from '../../context/AppProvider';
function SectionServices(props: any) {
    const { SERVICES, onGotoFilterResult, keyword } = props;
    const {t} = useContext(AppContext);
    const dispatch = useDispatch();
    const onViewMore = () => {
        if (onGotoFilterResult) {
            onGotoFilterResult()
            dispatch(onSetTabResult(1))
            dispatch(onToggleSearchCnt(false))
        }
    }

    return (
        SERVICES.services.length > 0 ?
            <div className='search-section-item'>
                <div className="flex-row-sp search-section-item__title">
                    {t("Mer_de.services")}
                    <span onClick={onViewMore} >{t("trending.watch_all")}</span>
                </div>
                <div className="search-section-item__list">
                    <ul className="list">
                        {
                            SERVICES.services.slice(0, 4).map((item: IServicePromo, index: number) => (
                                <li key={index}>
                                    <ServiceResultItem
                                        service={item}
                                        keyword={keyword}
                                    />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            :
            <></>
    );
}

export default SectionServices;