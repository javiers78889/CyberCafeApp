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
                    {alterna ? (
                        <>

                            <h5 className="card-title text-center"><strong>Miami-Panama Por Libras</strong></h5>

                            <p className="card-text">
                                <strong>Nombre:</strong> F2S/AGS OCEAN {prueba} <br />
                                <strong>Apellido:</strong>{Login.user[0].nombre} <br />
                                <strong>Dirección:</strong> 5401 NW 72ND AVE.<br />
                                <strong>Código postal</strong>: 33166 - 4941.<br />
                                <strong>Ciudad:</strong> Miami<br />
                                <strong>Estado:</strong> Florida<br />
                                <strong>País:</strong> USA<br />
                                <strong>Teléfono:</strong> +1 (786) 488-3729<br />
                            </p>

                        </>



                    ) : (
                        <>

                            <h5 className="card-title text-center"><strong>Miami-Panama Por Pies Cubicos</strong></h5>

                            <p className="card-text">
                                 <strong>Nombre:</strong> Ocean /AGS {prueba}<br />
                                 <strong>Apellido:</strong> nombre y apellido<br />
                                 <strong>Direccion #1:</strong> 1345 N.W, 98TH CT, Unit 2<br />
                                 <strong>Ciudad:</strong> MIAMI,<br />
                                 <strong>Estado:</strong> FL<br />
                                 <strong>Codigo postal:</strong> 33172-3049<br />
                                 <strong>Pais:</strong> USA<br />
                                 <strong>Tel:</strong> 786-360-2816<br />
                            </p>
                        </>
                    )}
                    {alterna ? (
                        <button className="btn btn-warning" onClick={alternar}>Direccion X Pies Cubicos</button>) :
                        (<button className="btn btn-success" onClick={alternar}>Direccion Por Libras</button>)}
                    <button className="btn btn-secondary my-1" onClick={() => handleFlip('alternativa')}>Volver</button>
                </div>
            </div>
        </div>
    )
}