import React from 'react';
import LanguageBox from './LanguageBox';


function Language(props: any) {
      const {
            openLang,
            // unit,
            // setUnit
      } = props;
      return (
            <div
                  style={openLang === true ?
                        { 
                              top: '3rem',
                              opacity: '1', 
                              visibility: 'visible',
                              width: 'max-content',
                              borderRadius: '10px',
                              padding: '10px'
                        }
                        :
                        { 
                              top: '5rem', 
                              opacity: '0', 
                              visibility: 'hidden',
                              width: 'max-content',
                        }}
                  className="flex-row hd-lang-box"
            >
                  <LanguageBox />
            </div>
      );
}

export default Language;