import React from 'react';
import lines from '../../../assets/images/Lines.png';
import signup from '../../../assets/images/Signup_now.png';
import '../../../styles/homepageheader.css';
import { simpleWarningAlert } from '../../../utils/common/alerts';

export const HomePageHeader = () => {
  return (
    <div className='HomePageHeader-container'>
        <img src={lines} alt="Lines pattern" className='lines1'/>
        <div className="HomePageHeader-1">
            <h1>
                La opción más  <span>asequible</span> para 
                <br />
                aprender trading a nivel mundial
            </h1>
            <p>
                Aprende todo sobre trading. Fácil, asequible y eficiente.
                <br />
                ¿Qué esperas? ¡Inscríbete ahora y disfruta de un mes gratis!
            </p>
            <img 
                src={signup} 
                alt="Signup right now!" 
                className='signup_button'
                onClick={() => simpleWarningAlert(
                    'Aguarda...', 
                    'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                    'dark'
                )}
            />
        </div>
    </div>
  )
}
