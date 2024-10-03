import React from 'react';
import '../../../styles/unlock.css';
import { simpleWarningAlert } from '../../../utils/common/alerts';

export const Unlock = () => {
  return (
    <div className='unlock-container'>
        <div className="unlock-info-container">
            <span>MASTERCLASSES</span>
            <h1>
                Desbloquea tu potencial
                <br />
                con nuestras <span>Masterclasses</span>
            </h1>
            <p>
                ¿Te imaginas aprendes de las mentes más brillantes del trading?
                <br />
                Con nuestras Masterclass Especializadas, esto es una realidad
            </p>
            <button 
                className='unlock-button'
                onClick={() => simpleWarningAlert(
                    'Aguarda...', 
                    'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                    'dark'
                )}
            >
                Comienza ya
            </button>
        </div>
    </div>
  )
}
