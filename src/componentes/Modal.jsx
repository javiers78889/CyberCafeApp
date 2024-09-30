import React from 'react';

export const Modal = ({ show, handleClose, user, onSubmit,onInputChange }) => {
    return (
        <>
           
            <div
                className={`modal fade ${show ? 'show' : ''}`}
                style={{ display: show ? 'block' : 'none' }}
                
            >
                <div className="modal-dialog modal-dialog-top ">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Editar Usuario
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleClose}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            {user && (
                                <form onSubmit={onSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='usuario'
                                            defaultValue={user.usuario}
                                            onChange={onInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Contraseña</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='contraseña'
                                            defaultValue={user.contraseña}
                                            onChange={onInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='nombre'
                                            defaultValue={user.nombre}
                                            onChange={onInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Plan</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="plan"
                                            defaultValue={user.plan}
                                            onChange={onInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Telefono</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="telefono"
                                            defaultValue={user.telefono}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="nombre" className="form-label">Correo</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="correo"
                                            onChange={onInputChange}
                                            defaultValue={user.correo}
                                            required
                                        />
                                    </div>
                                    <button type="submit" onSubmit={onSubmit} className="btn btn-primary">Guardar cambios</button>
                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleClose}
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
