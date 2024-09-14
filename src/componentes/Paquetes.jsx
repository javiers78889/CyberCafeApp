
import 'jspdf-autotable';
import { AdminPackage } from "./paquetes/AdminPackage";
import { UsersPackage } from "./paquetes/UsersPackage";

import { usePDF } from "../hooks/usePDF";

export const Paquetes = ({ paquetess, Login, Entregar, pago, isLoading }) => {
    const paquetes =Array.isArray(paquetess.data) ? paquetess.data : [];

    const generatePDF= usePDF(paquetes);

    const ValorLogueo = (Login.user && Login.user.length > 0) ? Login.user[0].usuario : '';

   

    return (
        <div  className='Logop'>


            {isLoading && <div className="alert alert-info">Cargando...</div>}


            <div className="container my-2">
                <table className="table">
                    <thead>
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
                                    <th scope="col">Pago</th>
                                    {Login.user[0].usuario === 'admin' ?(<th scope="col"></th>):('')}
                                    
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {paquetes ? (


                            Login.user[0].usuario === 'admin' ? (
                                paquetes.map(pack => (
                                    <tr key={pack.id}>
                                        <AdminPackage Entregar={Entregar} pack={pack} generatePDF={generatePDF} Login={Login} />
                                    </tr>
                                ))
                            ) : (
                                paquetes.length > 0 ? (
                                    paquetes.filter(pack => pack.usuario === ValorLogueo).map(pack => (
                                        <tr key={pack.id}>

                                            <UsersPackage key={pack.id} pack={pack} ValorLogueo={ValorLogueo} pago={pago} generatePDF={generatePDF} Login={Login} />

                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">
                                            <div className="alert alert-primary my-5" role="alert">
                                                No hay paquetes registrados
                                            </div>
                                        </td>
                                    </tr>
                                )
                            )




                        ) : (<tr><td><p>Cargando...</p></td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

