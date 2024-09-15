import { useState } from "react"

export const MiamiPanama = ({ flipped, Login, handleFlip }) => {
    const [alterna, setAlterna] = useState(true)

    const alternar = () => {
       
        if (alterna) {
            setAlterna(false)
        }
        else {
            setAlterna(true)
        }
    }
    return (
        <div className={`carta-container ${flipped.aerea ? 'flipped' : ''}`} style={{ width: '18rem' }}>
            <div className="card carta front ">
                <div className="d-flex justify-content-center align-items-center my-4" style={{ height: '8rem' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-airplane" viewBox="0 0 16 16">
                        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849m.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1s-.458.158-.678.599" />
                    </svg>
                </div>
                <div className="card-body d-flex justify-content-center flex-column">
                    <h5 className="card-title text-center"><strong>Casillero Aéreo </strong></h5>
                    <p className="card-text text-center">
                        Miami-Panama
                    </p>
                    <button className="btn btn-secondary" onClick={() => handleFlip('aerea')}>Ver</button>
                </div>
            </div>
            <div className="card carta back">

                <div className="card-body d-flex justify-content-center flex-column">
        

                            <h5 className="text-center"><strong>Aereo</strong></h5>
                            <p className="card-text">
                                <strong>Nombre:</strong> {Login.user[0].usuario}<br />
                                <strong>Apellido:</strong> {Login.user[0].nombre}<br />
                                <strong>Direccion #1:</strong> 5401 NW 72ND AVE,Doral FL 33166<br />
                                <strong>Ciudad:</strong> Doral,<br />
                                <strong>Estado:</strong> Florida<br />
                                <strong>Codigo postal:</strong> 33166<br />
                                <strong>Pais:</strong> USA<br />
                                <strong>Tel:</strong> 305-3645238<br />

                            </p>

                        




                   

                    
                    <button className="btn btn-secondary my-1 " onClick={() => handleFlip('aerea')}>Volver</button>
                </div>
            </div>
        </div>



    )
}