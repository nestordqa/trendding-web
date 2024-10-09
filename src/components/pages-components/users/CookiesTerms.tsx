import React, { useEffect } from 'react';
import '../../../styles/cookies-terms.css';
import { Footer } from './Footer';

export const CookiesTerms = () => {
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
                    Política de cookies de
                    <br />
                    Trendding Academy
                </h1>
                <p>
                    Fecha de última actualización: 24/01/2024.
                    <br />
                    <br />
                    Bienvenido a Trendding Academy. Esta Política de Cookies explica cómo utilizamos
                    <br />
                    cookies y tecnologías similares en nuestro sitio web. Al acceder y utilizar nuestro sitio
                    <br />
                    web, usted acepta el uso de cookies de acuerdo con esta política.
                </p>
            </div>
            <div className="cookies-info-info">
                <div className="little-info">
                    <h2>
                        ¿Qué son las Cookies?
                    </h2>
                    <p>
                        Las cookies son pequeños archivos de texto que se almacenan en su dispositivo
                        <br />
                        cuando visita un sitio web. Estas cookies contienen información que se utiliza para
                        <br />
                        mejorar la experiencia del usuario y recopilar información sobre el comportamiento
                        <br />
                        de navegación.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Tipos de cookies utilizadas:
                    </h2>
                    <p>
                        a. Cookies esenciales: necesarias para el funcionamiento básico del sitio web.
                        <br />
                        <br />
                        b. Cookies Analíticas: Nos permiten analizar cómo interactúan los usuarios con el sitio, para mejorar su rendimiento.
                        <br />
                        <br />
                        d. Cookies de funcionalidad: Mejoran la funcionalidad y personalización del sitio.
                        <br />
                        <br />
                        d. Cookies publicitarias: se utilizan para mostrarle anuncios relevantes.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Cómo utilizamos las cookies:
                    </h2>
                    <p>
                        Utilizamos cookies para mejorar la funcionalidad del sitio y brindarle una experiencia
                        <br />
                        personalizada.
                        Recopilamos datos estadísticos sobre el uso del sitio para comprender cómo
                        <br />
                        interactúan los usuarios con él.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Control de cookies:
                    </h2>
                    <p>
                        Puedes controlar y/o eliminar las cookies según tus preferencias. Revise la
                        <br />
                        configuración de su navegador para administrar las cookies.
                        <br />
                        <br />
                        La desactivación de ciertas cookies puede afectar la funcionalidad del sitio.
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
                        Enlaces a otros sitios web:
                    </h2>
                    <p>
                        Nuestro sitio puede contener enlaces a otros sitios web que tienen sus propias
                        <br />
                        políticas de cookies. No somos responsables de las prácticas de privacidad de estos
                        <br />
                        sitios.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Cambios en la Política de Cookies:
                    </h2>
                    <p>
                        Nos reservamos el derecho de actualizar esta política para reflejar cambios en
                        <br />
                        nuestras prácticas de cookies. La fecha de la última actualización se indicará al inicio
                        <br />
                        de la política.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Contacto:
                    </h2>
                    <p>
                        Si tiene preguntas sobre nuestra política de cookies, puede contactarnos en correo
                        <br />
                        electrónico o número de teléfono.
                        <br />
                        <br />
                        Al utilizar nuestro sitio web, usted acepta el uso de cookies de acuerdo con esta
                        <br />
                        política. Le recomendamos que revise esta política periódicamente para estar al
                        <br />
                        tanto de cualquier cambio.
                    </p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
