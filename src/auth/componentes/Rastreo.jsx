import React, { useState } from 'react'

export const Rastreo = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [showIframe, setShowIframe] = useState(false);

    const handleInputChange = (e) => {
        setTrackingNumber(e.target.value);
    };

    const handleTrack = () => {
        if (trackingNumber) {
            setShowIframe(true);
        }
    };
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
                <button className='btn btn-danger form-controlw-20' onClick={handleTrack}>Rastrear</button>

                {showIframe && (
                    <iframe
                        src={`https://www.logisticaxpress.com/tracking?tracking=${trackingNumber}`}
                        width="100%"
                        height="600px"
                        title="Tracking"
                        style={{ border: 'none' }}
                    />
                )}
            </div>
        </div>
    )
}
