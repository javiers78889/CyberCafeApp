import { useState } from "react"

export const MaritimoMiamiPanama = ({ flipped, Login, handleFlip }) => {
    const [alterna, setAlterna] = useState(true)
    const prueba = Login.user[0].usuario[4] + Login.user[0].usuario[5] + Login.user[0].usuario[6];

    const alternar = () => {
        console.log(prueba)
        if (alterna) {
            setAlterna(false)
        }
        else {
            setAlterna(true)
        }
    }
    return (
        <div className={`carta-container ${flipped.alternativa ? 'flipped' : ''}`} style={{ width: '18rem' }}>
            <div className="card carta front">
                <div className="d-flex justify-content-center align-items-center my-4" style={{ height: '8rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-droplet-fill" viewBox="0 0 16 16">
                        <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13" />
                    </svg>
                </div>
                <div className="card-body d-flex justify-content-center flex-column">
                    <h5 className="card-title text-center"><strong>Casillero Maritimo </strong> </h5>
                    <p className="card-text text-center">
                        Miami-Panama
                    </p>
                    <button className="btn btn-secondary" onClick={() => handleFlip('alternativa')}>Ver</button>
                </div>
            </div>
            <div className="card carta back">

                <div className="card-body d-flex justify-content-center flex-column">
                
                            <h5 className="card-title text-center"><strong>Maritimo</strong></h5>

                            <p className="card-text">
                                <strong>Nombre:</strong> EVAN3 OCEAN {Login.user[0].nombre}{Login.user[0].apellido} <br />
                                <strong>Dirección:</strong> 5401 NW 72ND AVE,Doral FL 33166<br />
                                <strong>Ciudad:</strong> Doral<br />
                                <strong>Estado:</strong> Florida<br />
                                <strong>País:</strong> USA<br />
                                <strong>Código postal</strong>: 33166<br />
                                <strong>Teléfono:</strong> 305-3645238<br />
                            </p>

                      
                    
                    <button className="btn btn-secondary my-1" onClick={() => handleFlip('alternativa')}>Volver</button>
                </div>
            </div>
        </div>
    )
}