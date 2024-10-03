import React from 'react';
import suiche from '../../../assets/images/Switcher.png';
import princing from '../../../assets/images/Pricing.png';
import '../../../styles/memberships.css';
import { simpleWarningAlert } from '../../../utils/common/alerts';

export const Memberships = () => {
  return (
    <div className='memberships-container'>
      <span>NUESTROS PLANES</span>
        <h1>Conoce nuestras membresías</h1>
        <img src={suiche} alt="Suiche" />
        <img src={princing} alt="Pricing" />
        <button 
          className='knowmore-button'
          onClick={() => simpleWarningAlert(
            'Aguarda...', 
            'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
            'dark'
          )}
          >
            Ver todos los beneficios
          </button>
    </div>
  )
}
