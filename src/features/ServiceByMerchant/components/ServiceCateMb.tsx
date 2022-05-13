import React from 'react';
import icon from '../../../constants/icon';

function ServiceCateMb(props: any) {
      const { categories, chooseCate, setChooseCate, dataServices, setDataServices } = props;
      const onCateAll = () => {
            setChooseCate();
            setDataServices({ ...dataServices, page: 1 })
      }
      const handleActiveCateClick = (cate: any) => {
            setChooseCate(cate.id);
            setDataServices({ ...dataServices, page: 1 })
      }
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
                                          onClick={onCateAll}
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