import React, { useEffect } from 'react';
import '../../../styles/cookies-terms.css';
import { Footer } from './Footer';

export const ReturnMoneyPolicy = () => {
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
                    Política de devolución de 
                    <br />
                    sorteos
                </h1>
                <p>
                    Su política de devolución de sorteos es importante para nosotros en Untitled.
                    <br />
                    Respetamos su Política de devolución de sorteos con respecto a cualquier información
                    <br />
                    que podamos recopilar de usted a través de nuestro sitio web.
                </p>
            </div>
            <div className="cookies-info-info">
                <div className="little-info">
                    <h2>
                        Derecho de desistimiento:
                    </h2>
                    <p>
                        El comprador tiene derecho a desistir de su compra de boletos de rifa en un plazo de
                        <br />
                        X días desde la fecha de compra.
                        <br /><br />
                        Para ejercitar este derecho, el comprador deberá notificarlo a nuestro servicio de
                        <br />
                        atención al cliente mediante correo electrónico a support@trendding.com dentro del plazo indicado.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Requisitos para la devolución:
                    </h2>
                    <p>
                        Los boletos de la rifa deben estar en su estado original y sin usar.
                        <br /><br />
                        La solicitud de devolución debe incluir información de compra, como el número de
                        <br />
                        pedido y la fecha de compra.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Excepciones:
                    </h2>
                    <p>
                        No se aceptarán devoluciones después de X días desde la fecha de
                        <br /><br />
                        compra.
                        No se aceptarán devoluciones de boletos que ya hayan sido utilizados para
                        <br />participar en un sorteo.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Proceso de devolución:
                    </h2>
                    <p>
                        Luego de recibir la solicitud de devolución, nuestro equipo de atención al cliente
                        <br />
                        revisará la información proporcionada.
                        <br /><br />
                        Si la devolución es elegible, se proporcionará un reembolso al método de pago
                        <br />
                        original dentro de X días hábiles.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Cancelación del sorteo:
                    </h2>
                    <p>
                        En casos excepcionales, nos reservamos el derecho de cancelar un sorteo. En tales
                        <br />
                        situaciones, se ofrecerá un reembolso completo a todos los participantes.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Contacto:
                    </h2>
                    <p>
                        Para cualquier pregunta sobre devoluciones o cancelaciones, comuníquese con
                        <br />
                        nuestro servicio de atención al cliente al support@trendding.com o 0123456789.
                    </p>
                </div>
                <div className="little-info">
                    <h2>
                        Cambios de política:
                    </h2>
                    <p>
                        Nos reservamos el derecho de realizar cambios en nuestra política de devoluciones.
                        <br />
                        Cualquier modificación será notificada a los clientes a través de nuestra página web.
                    </p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  )
}
