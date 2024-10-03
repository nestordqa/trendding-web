import React from 'react';
import dollar from '../../../assets/images/dollar.png';
import '../../../styles/goodbye.css';
import { simpleWarningAlert } from '../../../utils/common/alerts';

export const Goodbye = () => {
  return (
    <>
        <div className='goodbye-container'>
            <div className="goodbye-info-container">
                <h1>
                    Dile adiós a los cursos
                    <br />
                    <b>sobrevalorados</b> donde pagas
                    <br />
                    el doble y aprendes <b>muy poco</b>
                </h1>
                <button 
                    className='goodbye-button'
                    onClick={() => simpleWarningAlert(
                        'Aguarda...', 
                        'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                        'dark'
                    )}
                >
                    ¡Obtener mes gratis!
                </button>
            </div>
            <div className="goodbye-info-container2">
                <img src={dollar} alt="Progress example grafic" />
            </div>
        </div>
    </>
  )
}
