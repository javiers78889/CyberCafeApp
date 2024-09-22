import 'jspdf-autotable';
import React, { useState } from 'react';
import { AdminPackage } from "./paquetes/AdminPackage";
import { UsersPackage } from "./paquetes/UsersPackage";
import { usePDF } from "../hooks/usePDF";
import ReactPaginate from 'react-paginate';

export const Paquetes = ({ paquetess, Login, Entregar, pago, isLoading, eliminarPaquete }) => {
    const paquetes = Array.isArray(paquetess.data) ? paquetess.data : [];
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 8;

    const generatePDF = usePDF(paquetes);

    const ValorLogueo = (Login.user && Login.user.length > 0) ? Login.user[0].usuario : '';

    // Filter paquetes for regular users
    const filteredPaquetes = Login.user[0].usuario === 'admin'
        ? paquetes
        : paquetes.filter(pack => pack.usuario === ValorLogueo);

    // Paginate the items
    const offset = currentPage * itemsPerPage;
    const currentPaquetes = filteredPaquetes.slice(offset, offset + itemsPerPage);
    const pageCount = Login.user[0].usuario === 'admin'
        ? Math.ceil(paquetes.length / itemsPerPage)
        : filteredPaquetes.length > 0
            ? Math.ceil(filteredPaquetes.length / itemsPerPage)
            : 1;  // Ensure at least one page for users

    // Handle page click
    const handlePageClick = (event) => {
        const selectedPage = event.selected;
        setCurrentPage(selectedPage);
    };
    const formatDate = (dateString) => {
        const fecha = new Date(dateString);
        const anio = fecha.getFullYear();
        const mes = String(fecha.getMonth() + 1).padStart(2, '0'); // getMonth() devuelve un índice de 0 a 11
        const dia = String(fecha.getDate()).padStart(2, '0'); // getDate() devuelve el día del mes

        return `${anio}-${mes}-${dia}`;
    };


    return (
        <div className='Logop'>
            {isLoading && <div className="alert alert-info">Cargando...</div>}

            <div className="container my-2">
                {/* Envolver la tabla en table-responsive para scroll horizontal en pantallas pequeñas */}
                <div className="table-responsive">
                    <table className="table">
                        <thead className='table-dark'>
                            <tr>
                                <th scope="row">Id</th>
                                <th scope="row">Tracking ID</th>
                                <th scope="row">Peso(lb)</th>
                                <th scope="row">Precio($)</th>
                                <th scope="row">Status</th>
                                {Login.user[0].usuario === 'admin' ? (
                                    <>
                                        <th scope="row">Pago</th>
                                        <th scope="row">Fecha de Registro</th>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                        <th scope="row"></th>
                                    </>
                                ) : (
                                    <>
                                        <th scope="row">Fecha de Registro</th>
                                        <th scope="row">Recibo</th>
                                        {Login.user[0].usuario === 'admin' ? (<th scope="col"></th>) : ('')}
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {currentPaquetes.length > 0 ? (
                                Login.user[0].usuario === 'admin' ? (
                                    currentPaquetes.map(pack => (
                                        <tr key={pack.id}>
                                            <AdminPackage Entregar={Entregar} eliminarPaquete={eliminarPaquete} pack={pack} formatDate={formatDate} generatePDF={generatePDF} Login={Login} />
                                        </tr>
                                    ))
                                ) : (
                                    currentPaquetes.map(pack => (
                                        <tr key={pack.id}>
                                            <UsersPackage pack={pack} ValorLogueo={ValorLogueo} formatDate={formatDate} pago={pago} generatePDF={generatePDF} Login={Login} />
                                        </tr>
                                    ))
                                )
                            ) : (
                                <tr>
                                    <td colSpan="10">
                                        <div className="alert alert-primary my-5" role="alert">
                                            No hay paquetes registrados
                                        </div>
                                    </td>
                                   
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {(pageCount > 1) && (
                    <ReactPaginate
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        activeClassName={'active'}
                    />
                )}
            </div>
        </div>
    );
};
