import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom';

export const Rastreo = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
   

    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };



    const trackeo=()=>{
        window.location.href = `https://clientes.japslogistics.com/ConsultaTracking.aspx?cid=1&idGuia=${trackingNumber}`

    }
    return (
        <div className='centrar'>




            <div className="tracking-container">
                <h2>Rastrea tu paquete</h2>

                
                    <input
                        type="text"
                        value={trackingNumber}
                        onChange={handleInputChange}
                        placeholder="Ingresa el número de seguimiento"
                    />
                    <button className='btn btn-danger form-controlw-20' onClick={trackeo}>Rastrear</button>
                
            </div>
        </div>
    )
}
