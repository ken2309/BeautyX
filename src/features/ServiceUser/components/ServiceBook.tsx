import React from 'react';
import ServiceNotBook from '../ServiceNotBook';
// import ServiceBooked from '../ServiceBooked'

function ServiceBook(props: any) {
      // const {t} = useContext(AppContext)
      // const btnList = [
      //       { id: 1, title: 'Chưa đặt hẹn' },
      //       { id: 2, title: 'Đã đặt hẹn' }
      // ]
      //const [activeBtn, setActiveBtn] = useState(1);
      return (
            <div
                  className="my-ser-book__cnt"
            >
                  {/* <div className="my-ser-book__cnt-head">
                        <span className="my-ser-book__cnt-head-title">
                              {
                                    activeBtn === 1 ? t('my_ser.choose_ser') : t('my_ser.services_book')
                              }
                        </span>
                        <div className="flex-row my-ser-book__cnt-head-btn">
                              <span>
                                    {t('my_ser.status')}:
                              </span>
                              <div className="btn">
                                    {
                                          btnList.map(item => (
                                                <button
                                                      style={item.id === activeBtn ?
                                                            { backgroundColor: 'var(--purple)', color: 'var(--bgWhite)' } : {}
                                                      }
                                                      onClick={() => setActiveBtn(item.id)}
                                                      key={item.id}
                                                >
                                                      {item.title}
                                                </button>
                                          ))
                                    }
                              </div>
                        </div>
                  </div> */}
                  <ServiceNotBook
                        tab_id={1}
                  />
                  {/* <ServiceBooked
                        tab_id={activeBtn}
                  /> */}
            </div>
      );
}

export default ServiceBook;