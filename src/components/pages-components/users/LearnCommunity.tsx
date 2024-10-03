import React from 'react';
import Map from '../../../assets/images/map.png';
import Stadistics from '../../../assets/images/estadisticas.png';
import '../../../styles/learnComunity.css';
export const LearnCommunity = () => {
  return (
    <div className='LearnCommunity'>
        <div className="header-learn">
            <h1>
                Aprende
                <br />
                en comunidad
            </h1>
            <p>
                En nuestra academia de trading, no solo
                <br />
                enseñamos gráficos y tendencias. 
                <br />
                Es un spot donde traders de todos los niveles 
                <br />
                se conectan, comparten y crecen juntos.  
            </p>
            <img src={Stadistics} alt="Estadisticas" />
        </div>
        <div className="community-container">
            <img src={Map} alt="Road Map Community" />
        </div>
    </div>
  )
}
