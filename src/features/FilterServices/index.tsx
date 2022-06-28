import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider';
import './filter-services.css'

function FilterServices(props: any) {
    const { dataSort, setDataSort, setData } = props;
    const { t } = useContext(AppContext)
    const sortList = [
        { id: 2, title: t("home_2.hot_promotion"), query: '-discount_percent' },
        { id: 1, title: t("home_2.places_near_you"), query: null },
        //{ id: 8, title: 'Dịch vụ HOT', query: '-modified_date' },
        { id: 3, title: t("Mer_de.ascending_price"), query: 'price' },
        { id: 4, title: t("Mer_de.decrease_price"), query: '-price' },
        { id: 5, title: t("home_2.selling"), query: '-bought_count' },
        { id: 6, title: t("home_2.name") + 'A-Z', query: 'service_name' },
        { id: 7, title: t("home_2.name") + 'Z-A', query: '-service_name' },
    ]
    const onChooseSortType = (sort: any) => {
        if (dataSort !== sort.query) {
            setDataSort(sort.query)
            setData({ services: [], totalItem: 1, page: 1 })
        }
    }
    return (
        <div className='filter-ser-cnt'>
            <ul className="flex-row filter-ser-list">
                {
                    sortList.map(item => (
                        <li
                            style={dataSort === item.query ?
                                {
                                    backgroundColor: 'var(--pink)',
                                    color: 'var(--red-cl)',
                                    border: 'solid 1px var(--red-cl)'
                                }
                                :
                                {}}
                            onClick={() => onChooseSortType(item)}
                            key={item.id}
                        >
                            {item.title}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default FilterServices;