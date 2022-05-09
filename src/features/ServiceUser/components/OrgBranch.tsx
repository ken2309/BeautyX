import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppProvider';

function OrgBranch(props: any) {
      const { t } = useContext(AppContext)
      const { branches, dataBook, setDataBook, open, setOpen } = props;
      const onChooseBranch = (item: any) => {
            setDataBook({
                  ...dataBook,
                  branch: item
            })
      }
      return (
            <>
                  <div
                        style={
                              open.oBranch === true ?
                                    { opacity: 1, top: '50px', visibility: 'visible' }
                                    :
                                    { opacity: 0, top: '80px', visibility: 'hidden' }
                        }
                        className='ser-choose-br'
                  >
                        <ul>
                              {
                                    branches && branches?.map((item: any, index: number) => (
                                          <li
                                                key={index}
                                                onClick={() => onChooseBranch(item)}
                                          >
                                                <span className="name">
                                                      {t('my_ser.name_br')} : {item?.name}
                                                </span>
                                                <span className="address">
                                                      {t('Mer_de.address')} : {item?.full_address}
                                                </span>
                                          </li>
                                    ))
                              }
                        </ul>
                  </div>
                  <div
                        className={open.oBranch ? "back-drop_layout open" : "back-drop_layout"}
                        onClick={() => setOpen({
                              ...open,
                              oBranch: false
                        })}
                  ></div>
            </>
      );
}

export default OrgBranch;