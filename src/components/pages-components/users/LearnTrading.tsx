import React from 'react';
import steps from '../../../assets/images/steps.png';
import '../../../styles/learnTrading.css';
import { simpleWarningAlert } from '../../../utils/common/alerts';

export const LearnTrading = () => {
  return (
    <div className='LearnTrading-container'>
        <div className="LearnTrading-info-container">
            <h1>
                ¡Aprende Trading
                <br />
                de la forma más sencilla!
            </h1>
            <p>
                Con tan solo <b>4 sencillos pasos</b> puedes estgar generando miles de dólares!
                <br />
                Forma parte de nuestra gran familia
            </p>
            <button
                onClick={() => simpleWarningAlert(
                    'Aguarda...', 
                    'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                    'dark'
                )}
            >
                Más información
            </button>
        </div>
        <div className="steps-container">
            <img src={steps} alt="Trading Steps" />
        </div>
    </div>
  )
}
