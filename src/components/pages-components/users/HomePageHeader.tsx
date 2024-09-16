import React from 'react';
import '../../../styles/homepageheader.css';

export const HomePageHeader = () => {
  return (
    <div className='HomePageHeader-container'>
        <h1>
            La opción más 
            <br />
            <span>asequible</span> para aprender
            <br />
            trading a nivel mundial
        </h1>
        <p>
            Aprende todo sobre trading. Fácil, asequible y eficiente.
            <br />
            ¿Qué esperas? ¡Inscríbete ahora y disfruta de un mes gratis!
        </p>
        <button className='signup-button'>
            Inscríbete ahora
        </button>
    </div>
  )
}
