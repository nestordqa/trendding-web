import React, { useEffect } from 'react';
import '../../../styles/cookies-terms.css';
import { Footer } from './Footer';

export const PrivacyPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

  return (
    <div className='cookies-terms-container'>
        <div className='cookies-info'>
            <div className="cookies-info-header">
                <span>
                    Actualizado al 20 de enero del 2024
                </span>
                <h1>
                    Política de privacidad -
                    <br />
                    Trendding Academy
                </h1>
                <p>
                    Trendding Academy se compromete a proteger su privacidad. Esta Política de
                    <br />
                    privacidad describe nuestras prácticas con respecto a la recopilación, el uso y la
                    <br />
                    divulgación de información personal cuando utiliza nuestro sitio web,
                    <br />
                    www.TrenddingAcademy.com, y los servicios que se brindan en él. 
                </p>
            </div>
            <div className="cookies-info-info">
                <div className="little-info">
                    <h2>
                        1. Información que recopilamos
                    </h2>
                    <p>
                        1.1 Información personal: Podemos recopilar información personal, como su nombre,
                        <br />
                        dirección de correo electrónico y detalles de pago, cuando se registra en nuestro
                        <br />
                        sitio web o participa en un sorteo.
                        <br />
                        <br />
                        1.2 Datos de uso: Recopilamos automáticamente información sobre cómo interactúa
                        <br />
                        con nuestro sitio web, incluida su dirección IP, tipo de navegador y las páginas que
                        <br />
                        visita.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        2. Uso de la información
                    </h2>
                    <p>
                        2.1 Utilizamos la información recopilada para los siguientes fines:
                        <br />
                        <br />
                        Para proporcionar y mantener los Servicios.
                        <br />
                        <br />
                        Para notificarle sobre cambios en nuestros Servicios.
                        <br />
                        <br />
                        Para administrar sorteos y contactar a los ganadores.
                        <br />
                        <br />
                        Para recopilar análisis o información valiosa para mejorar nuestros Servicios.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        3. Divulgación de información
                    </h2>
                    <p>
                        3.1 Podemos compartir información personal en las siguientes circunstancias:
                        <br /><br />
                        Con proveedores de servicios para facilitar nuestros Servicios.
                        <br /><br />
                        Para cumplir con obligaciones legales.
                        <br /><br />
                        Para proteger y defender nuestros derechos o propiedad.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        4. Seguridad
                    </h2>
                    <p>
                        4.1 La seguridad de su información personal es importante para nosotros, pero
                        <br />
                        recuerde que ningún método de transmisión a través de Internet o almacenamiento
                        <br />
                        electrónico es 100% seguro. Si bien nos esforzamos por utilizar medios
                        <br />
                        comercialmente aceptables para proteger su información personal, no podemos
                        <br />
                        garantizar su seguridad absoluta.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Cookies de terceros:
                    </h2>
                    <p>
                        Trabajamos con proveedores de servicios externos que también pueden utilizar
                        <br />
                        cookies en nuestro sitio web.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        5. Cookies
                    </h2>
                    <p>
                        5.1 Utilizamos cookies para recopilar información y mejorar nuestros Servicios. Puede
                        <br />
                        configurar su navegador para que rechace todas las cookies o para que le indique
                        <br />
                        cuándo se envía una cookie.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        6. Enlaces de terceros
                    </h2>
                    <p>
                        6.1 Nuestros Servicios pueden contener enlaces a otros sitios que no son operados
                        <br />
                        por nosotros. Si hace clic en un enlace de terceros, se le dirigirá al sitio de ese
                        <br />
                        tercero. Le recomendamos encarecidamente que revise la Política de privacidad de
                        <br />
                        cada sitio que visite.
                    </p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
