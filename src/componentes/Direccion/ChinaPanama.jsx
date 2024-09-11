export const ChinaPanama = ({ flipped, Login, handleFlip }) => {
    return (

        <>
            <div className={`carta-container ${flipped.maritima ? 'flipped' : ''}`} style={{ width: '18rem' }}>
                <div className="card carta front">
                    <div className="d-flex justify-content-center align-items-center my-4" style={{ height: '8rem' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" className="bi bi-life-preserver" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m6.43-5.228a7.03 7.03 0 0 1-3.658 3.658l-1.115-2.788a4 4 0 0 0 1.985-1.985zM5.228 14.43a7.03 7.03 0 0 1-3.658-3.658l2.788-1.115a4 4 0 0 0 1.985 1.985zm9.202-9.202-2.788 1.115a4 4 0 0 0-1.985-1.985l1.115-2.788a7.03 7.03 0 0 1 3.658 3.658m-8.087-.87a4 4 0 0 0-1.985 1.985L1.57 5.228A7.03 7.03 0 0 1 5.228 1.57zM8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                        </svg>
                    </div>
                    <div className="card-body d-flex justify-content-center flex-column">
                        <h5 className="card-title text-center"><strong>Casillero Maritimo</strong></h5>
                        <p className="card-text text-center">
                            China-Panama
                        </p>
                        <button className="btn btn-secondary" onClick={() => handleFlip('maritima')}>Ver</button>
                    </div>
                </div>
                <div className="card carta back">

                    <div className="card-body d-flex justify-content-center flex-column">
                        <p className="card-text">
                            <strong>Nombre:</strong> {Login.user[0].nombre} AGS PTY<br />
                            <strong>Dirección:</strong> Lane 1, Jiuzhuang, Seventeenth Team, Hongqun Village, Huashan Town, Huadu
                            District, NANMEIGUOJIWULIU. AGS {Login.user[0].nombre}<br />
                            <strong>Pais:</strong> China<br />
                            <strong>Estado/Provincia:</strong> Guangdong, Guangzhou<br />
                            <strong>Ciudad:</strong> Guangzhou<br />
                            <strong>Código postal:</strong> 510800<br />
                            <strong>Telefono:</strong> 18028069012

                        </p>


                        <button className="btn btn-secondary" onClick={() => handleFlip('maritima')}>Volver</button>
                    </div>
                </div>
            </div>

        </>
    )
}