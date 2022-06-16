import i18next from 'i18next';
import React, {useContext} from 'react';
import { AppContext } from '../../../context/AppProvider';
import languages from '../../../data/languages';

function LanguageBox(props: any) {
      const { language, setLanguage } = useContext(AppContext);
      const handleChangeLang = (code: string) => {
            setLanguage(code)
            i18next.changeLanguage(code);
      }
      const handleChangeUnit = (unit: string) => {
            //setUnit(unit)
      }
      return (
            <>
                  <div className="hd-lang-box__left"
                        style={{
                              width: '100%',
                              borderRight: 'none'
                        }}
                  >
                        {
                              languages.map((item) => (
                                    <div
                                          onClick={() => handleChangeLang(item.code)}
                                          key={item.code}
                                          className="flex-row hd-lang-box__item"
                                    >
                                          <img src={item.icon} alt="" />
                                          <span
                                                style={item.code === language ? { color: 'var(--purple)' } : {}}
                                          >{item.title}</span>
                                    </div>
                              ))
                        }
                  </div>
                  {/* <div className="hd-lang-box__right">
                        {
                              languages.map((item) => (
                                    <div
                                          onClick={() => handleChangeUnit(item.unit)}
                                          // style={item.unit === unit ? { color: 'var(--purple)' } : {}}
                                          key={item.code}
                                          className="flex-row hd-lang-box__item"
                                    >
                                          <span className="hd-lang-box__item-unit">{item.unit}</span>
                                          <span className="hd-lang-box__item-curr">{item.currency}</span>
                                    </div>
                              ))
                        }
                  </div> */}
            </>
      );
}

export default LanguageBox;