import React from 'react';
import '../../../styles/testimonios.css';
import reviews from '../../../assets/images/reviews.png';
import { simpleWarningAlert } from '../../../utils/common/alerts';
export const Testimonios = () => {
  return (
    <div className='testimonios-container'>
        <span>
            CASOS DE ÉXITO
        </span>
        <h1>
            Testimonios
        </h1>
        <p>
            ¡Entérate de lo que dicen nuestros estudiantes!
        </p>
        <button
            onClick={() => simpleWarningAlert(
                'Aguarda...', 
                'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                'dark'
            )}
        >
            Ver mas casos de éxito
        </button>
        <img src={reviews} alt="Testimonios usuarios..." />
    </div>
  )
}
