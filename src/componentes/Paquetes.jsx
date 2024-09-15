import 'jspdf-autotable';
import React, { useState } from 'react';
import { AdminPackage } from "./paquetes/AdminPackage";
import { UsersPackage } from "./paquetes/UsersPackage";
import { usePDF } from "../hooks/usePDF";
import ReactPaginate from 'react-paginate';

export const Paquetes = ({ paquetess, Login, Entregar, pago, isLoading }) => {
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

    return (
        <div className='Logop'>
            {isLoading && <div className="alert alert-info">Cargando...</div>}

            <div className="container my-2">
                <table className="table">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Tracking ID</th>
                            <th scope="col">Peso(lb)</th>
                            <th scope="col">Precio($)</th>
                            <th scope="col">Status</th>
                            {Login.user[0].usuario === 'admin' ? (
                                <>
                                    <th scope="col">Pago</th>
                                    <th scope="col">Fecha de Registro</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </>
                            ) : (
                                <>
                                    <th scope="col">Fecha de Registro</th>
                                    <th scope="col">Recibo</th>
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
                                        <AdminPackage Entregar={Entregar} pack={pack} generatePDF={generatePDF} Login={Login} />
                                    </tr>
                                ))
                            ) : (
                                currentPaquetes.map(pack => (
                                    <tr key={pack.id}>
                                        <UsersPackage pack={pack} ValorLogueo={ValorLogueo} pago={pago} generatePDF={generatePDF} Login={Login} />
                                    </tr>
                                ))
                            )
                        ) : (
                            <tr>
                                <td colSpan="7">
                                    <div className="alert alert-primary my-5" role="alert">
                                        No hay paquetes registrados
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

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

