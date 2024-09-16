import React, { useState } from 'react';
import '../estilos/app.css'; // Asegúrate de tener este archivo para los estilos

import { ChinaPanama } from './Direccion/ChinaPanama';
import { MiamiPanama } from './Direccion/MiamiPanama';
import { MaritimoMiamiPanama } from './Direccion/MaritimoMiamiPanama';

export const Direcciones = ({ Login }) => {
    const [flipped, setFlipped] = useState({ aerea: false, maritima: false, alternativa: false });

    const handleFlip = (card) => {
        setFlipped(prevState => ({
            ...prevState,
            [card]: !prevState[card]
        }));
    };

    return (
        < >
            <h6 className='text-center '><strong>Mis Direcciones</strong></h6>
            <div className='d-flex gap-4'>
                <MiamiPanama flipped={flipped} Login={Login} handleFlip={handleFlip}/>

                <MaritimoMiamiPanama flipped={flipped} Login={Login} handleFlip={handleFlip}/>
               
            </div>
        </>
    );
};
