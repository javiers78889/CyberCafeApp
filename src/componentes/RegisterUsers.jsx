import { useState } from "react";

const paqDefault = {
    "usuario": "",
    "contraseña": "",
    "isAuth": 0,
    "nombre": "",
    "plan": "",
    "telefono": "",
    "correo": "",
    "fechaNacimiento": "fecha"
}

export const RegisterUsers = ({ addUsers, Login }) => {
    const [paq, setPaq] = useState(paqDefault);

    const { usuario, contraseña, nombre, telefono, plan, correo,fechaNacimiento } = paq;

    const onInputChange = (event) => {
        const { name, value } = event.target;
        setPaq({ ...paq, [name]: value });
    }



    const handlerSubmit = (event) => {
        event.preventDefault();
        addUsers(paq);
    }

    return (
        <div className="form-container form-overlay w-80 d-flex justify-content-center  margen">
            <form className="formularios shadow-lg p-4 bg-white rounded" onSubmit={handlerSubmit}>
                <div className="mb-3">
                    <label className="form-label">Usuario</label>
                    <input type="text" className="form-control" name="usuario" value={usuario} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" name="contraseña" value={contraseña} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="form-control" name="nombre" value={nombre} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="options">Plan</label>
                    <select
                        id="options"
                        className="form-select"
                        name="plan" // Debe coincidir con el nombre del estado
                        value={plan}
                        onChange={onInputChange}
                    >
                        <option value="">Selecciona un Plan...</option>
                        <option value="Plan Aereo">Plan Aereo</option>
                        <option value="Plan Maritimo">Plan Maritimo</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Teléfono</label>
                    <input type="text" className="form-control" name="telefono" value={telefono} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Correo(Opcional)</label>
                    <input type="email" className="form-control" name="correo" value={correo} onChange={onInputChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Fecha De Nacimiento(Opcional)</label>
                    <input type="date" className="form-control" name="fechaNacimiento" value={fechaNacimiento} onChange={onInputChange} />
                </div>

                <button type="submit" className="btn btn-danger form-control">Crear</button>
            </form>
        </div>
    );
}
