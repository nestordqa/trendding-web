import React from 'react';
import '../../../styles/decides.css';
import device from '../../../assets/images/Device.png';
import phone from '../../../assets/images/phone.png';
import pattern from '../../../assets/images/check-clip.png';
import elipse from '../../../assets/images/Ellipse.png';
import apps from '../../../assets/images/apps.png';
import { simpleWarningAlert } from '../../../utils/common/alerts';

export const Decides = () => {
  return (
    <div className='decides-container'>
        <div className="decides-info">
            <h1>
                ¿Aún no te decides?
            </h1>
            <p>
                Lorem ipsum dolor sit amet consectetur. Sit volutpat proin a sed donec
                <br />
                ipsum mi faucibus. Consequat justo habitasse morbi sed aliquet
                <br />
                tincidunt.
            </p>
            <button 
                onClick={() => simpleWarningAlert(
                    'Aguarda...', 
                    'Nos encontramos construyendo la app para que tengas la mejor experiencia, en algunos días podrás contar con todas la funciones...', 
                    'dark'
                )}
            >
                Comienza ya
            </button>
        </div>
        <div className="disponible">
            <div className="disponible-info">
                <div className="disponible-info-info">
                    <h1>
                        Disponible próximamente
                    </h1>
                    <p>
                        Accede a toda nuestra información
                        <br />
                        directamente desde tu teléfono.
                    </p>
                    <img 
                        src={apps} 
                        alt="Apps"
                        onClick={() => simpleWarningAlert(
                            'Aguarda...', 
                            'Nos encontramos construyendo las apps móviles...', 
                            'dark'
                        )}
                    />
                </div>
                <div className="phone">
                    <img src={device} alt="Phone" className='phone'/>
                    <img src={phone} alt="Screen" className='screen'/>
                    <img src={pattern} alt="Pattenr" className='pattern'/>
                    <img src={pattern} alt="Pattenr2" className='pattern2'/>
                    <img src={elipse} alt="Elipse" className='elipse'/>
                </div>
            </div>
        </div>
    </div>
  )
}
