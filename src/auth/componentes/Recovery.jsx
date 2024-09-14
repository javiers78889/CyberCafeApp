import React from 'react'
import { useState } from "react";
import fastShippingImg from '../../img/fete.jpeg';
import { Link } from 'react-router-dom';
const paqDefault = {
    "usuario": "",
    "contraseña": "",

}
export const Recovery = ({ UpdateUser }) => {
    const [paq, setPaq] = useState(paqDefault);

    const { usuario, contraseña } = paq;

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setPaq({ ...paq, [name]: value });
    }



    const handlerSubmit = (event) => {
        event.preventDefault();
        UpdateUser(paq);
    }
    return (
        <div className="form-container form-overlay w-60 d-flex align-items-center justify-content-center container centrar margenLog">
            <form className="w-50 shadow-lg  p-4 bg-white rounded my-5" onSubmit={handlerSubmit}>
                <div className="d-flex justify-content-center align-items-center mb-3">
                    <img className="img-fluid " src={fastShippingImg} width={100} height={100} alt="Foto de perfil" />
                </div>
                <h5 className='text-center'>Actualizar Tu Contraseña</h5>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" name="usuario" value={usuario} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="contraseña" value={contraseña} onChange={onInputChange} />
                </div>


                <button type="submit" className="btn btn-danger form-control">Actualizar</button>
                <Link className="btn btn-warning mt-3">Volver</Link>
            </form>
        </div>
    )
}
