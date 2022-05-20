import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import icon from '../../../constants/icon';
import { clearServices, fetchAsyncServices } from '../../../redux/org_services/orgServivesSlice';

function ServiceCateMb(props: any) {
      const { chooseCate, setChooseCate } = props;
      const dispatch = useDispatch();
      const ORG = useSelector((state: any) => state.ORG);
      const { org } = ORG;
      const { categories } = useSelector((state: any) => state.ORG_SERVICES.CATE);
      const allCate = () => {
            dispatch(clearServices());
            const values = {
                  cate_id: undefined,
                  org_id: org?.id,
                  page: 1
            }
            dispatch(fetchAsyncServices(values))
            setChooseCate(undefined);
      };
      const handleActiveCateClick = (cate: any) => {
            dispatch(clearServices());
            const values = {
                  cate_id: cate.id,
                  org_id: org?.id,
                  page: 1
            }
            dispatch(fetchAsyncServices(values))
            setChooseCate(cate.id);
      };
      return (
            <div className="mb-cate-wrapper">
                  <div className="flex-row-sp mb-cate__filter">
                        <input type="text" placeholder='Tim kiem  ' />
                        <img className="mb-cate__filter-search" src={icon.searchPurple} alt="" />
                        <img src={icon.filter} alt="" />
                  </div>
                  <div className="mb-cate__list-cate">
                        <ul className="mb-cate__list">
                              <li>
                                    <button
                                          onClick={allCate}
                                          style={!chooseCate ?
                                                { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' }
                                                :
                                                {}}
                                          className="mb-cate__list-item"
                                    >
                                          Tất cả
                                    </button>
                              </li>
                              {
                                    categories.map((item: any) => (
                                          <li key={item.id} >
                                                <button
                                                      style={chooseCate === item.id ?
                                                            {
                                                                  backgroundColor: 'var(--purple)',
                                                                  color: 'var(--bgWhite)'
                                                            }
                                                            :
                                                            {}}
                                                      onClick={() => handleActiveCateClick(item)}
                                                      className="mb-cate__list-item"
                                                >
                                                      {item.name}
                                                </button>
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
            </div>
      );
}

export default ServiceCateMb;