import React, { useState } from 'react';
import { Modal } from './Modal';
import { UpdateAllUsers } from '../auth/services/Users';
import Swal from 'sweetalert2';

export const ListaUsuarios = ({ UsuariosExis, fetchUsuarios }) => {
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

    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(''); // Para guardar el usuario seleccionado
    const [id, setID] = useState(0)
    const handleClose = () => {
        setSelectedUser('')
        setShow(false)
    };
    const handleShow = (user) => {
        setSelectedUser(user); // Guarda el usuario seleccionado
        setShow(true);
    };
    const onInputChange = (event) => {
        const { name, value } = event.target;

        setSelectedUser({ ...selectedUser, [name]: value })


    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
        const actualizar = await UpdateAllUsers({ ...selectedUser })
        if (!actualizar) {
            Swal.fire({
                icon: "error",
                title: "Erro de Conexión",
                text: "Intentelo Más Tarde!",
            });
        }
        Swal.fire({
            icon: "success",
            title: "Usuario Editado",
            text: "Presione Ok",
        });
        fetchUsuarios();
        handleClose();
    };

    return (
        <>
            <Modal show={show} onInputChange={onInputChange} handleClose={handleClose} user={selectedUser} onSubmit={handleSubmit} />
            <h6><strong>Lista De Usuarios Registrados</strong></h6>

            <div className="table-responsive w-100">
                <table className="table table-hover table-striped">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Contraseña</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Plan</th>
                            <th scope="col">Teléfono</th>
                           
                            <th scope="col">Editar</th>
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
                               
                                <td><button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handleShow(user)} // Llama a handleShow con el usuario
                                >
                                    Editar
                                </button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

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
