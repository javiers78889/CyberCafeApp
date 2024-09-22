import React, { useState } from 'react';

export const ListaUsuarios = ({ UsuariosExis }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 4;

    // Asegúrate de que UsuariosExis sea un array
    const validUsuariosExis = Array.isArray(UsuariosExis) ? UsuariosExis : [];

    // Calcula el índice del primer y último usuario en la página actual
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    // Selecciona los usuarios que se deben mostrar en la página actual
    const currentUsers = validUsuariosExis.slice(indexOfFirstUser, indexOfLastUser);

    // Calcula el número total de páginas
    const totalPages = Math.ceil(validUsuariosExis.length / usersPerPage);

    // Maneja el cambio de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <h6><strong>Lista De Usuarios Registrados</strong></h6>
    


                <table className="table table-hover table-striped">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Plan</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentUsers.map(user => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.usuario}</td>
                                <td>{user.contraseña}</td>
                                <td>{user.nombre}</td>
                                <td>{user.plan}</td>
                                <td>{user.telefono}</td>
                                <td>{user.correo}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            

            {/* Renderiza los botones de paginación */}
            <div className="pagination">
                {[...Array(totalPages).keys()].map(pageNumber => (
                    <button
                        key={pageNumber + 1}
                        onClick={() => handlePageChange(pageNumber + 1)}
                        className={pageNumber + 1 === currentPage ? 'active' : ''}
                    >
                        {pageNumber + 1}
                    </button>
                ))}
            </div>
        </>
    );
};
