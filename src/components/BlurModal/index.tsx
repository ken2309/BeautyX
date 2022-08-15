import React, { useContext } from 'react';
import { AppContext } from '../../context/AppProvider'
import './BlurModal.css'

function BlurModal() {
      const { openModal } = useContext(AppContext)
      return (
            <div
                  style={openModal === true ? { marginTop: '0px' } : { marginTop: '100vh' }}
                  className="blur-modal"
            >

            </div>
      );
}

export default BlurModal;