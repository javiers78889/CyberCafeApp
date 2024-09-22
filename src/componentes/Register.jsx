import { useState } from "react";

const paqDefault = {
    "usuario": "",
    "tracking": "",
    "peso": "0",
    "precio": "0",
    "status": "Pendiente ⬜",
    "pago": "Pendiente ⬜",

}
export const Register = ({ addPaquetes, Login }) => {


    const [paq, setPaq] = useState(paqDefault);
    const { usuario, tracking, peso } = paq;


    const onInputChange = (event) => {

        const { name, value } = event.target;

        setPaq({ ...paq, [name]: value });


    }
    const handlerSubmit = (event) => {
        event.preventDefault();
        addPaquetes(paq);
    }


    return (
        <>

            <div className="  w-80 d-flex justify-content-center align-items-center margenForm ">
                <form className="formularios shadow-lg p-4 bg-white rounded" onSubmit={handlerSubmit}>
                    <h2>Registra Un Paquete <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                    </svg></h2>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input type="text" className="form-control" name="usuario" value={usuario} onChange={onInputChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">N°Tracking</label>
                        <input type="text" className="form-control" name="tracking" value={tracking} onChange={onInputChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label" >Peso/Volumen</label>
                        <input type="number" className="form-control" name="peso" value={peso} onChange={onInputChange} />
                    </div>


                    <button type="submit" className="btn btn-danger form-control">Crear</button>
                </form>



            </div>

        </>
    )
}
