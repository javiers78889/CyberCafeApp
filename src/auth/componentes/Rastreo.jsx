import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom';
import fastShippingImg from '../../img/fete.jpeg';
export const Rastreo = () => {
    const [trackingNumber, setTrackingNumber] = useState('');


    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };



    const trackeo = () => {
        if(trackingNumber != ''){
              window.location.href = `https://clientes.japslogistics.com/ConsultaTracking.aspx?cid=1&idGuia=${trackingNumber}`
        }
      

    }
    return (
        <div className='centrar'>




            <div className="tracking-container shadow-lg p-4 bg-white rounded  justify-content-center align-item-center formularios">
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <img className="img-fluid " src={fastShippingImg} width={100} height={100} alt="Foto de perfil" />
                </div>
                <h5>Rastrea tu paquete <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                    <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                </svg></h5>

                <div>
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={handleInputChange}
                        placeholder="Ingresa el número de seguimiento"
                        className='w-100 mt-2'
                    />
                    <div className='responsivo'>
                        <button className='btn btn-danger form-controlw-20 w-50 ' onClick={trackeo}>Rastrear</button>
                        <Link to='/'>Volver</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}
