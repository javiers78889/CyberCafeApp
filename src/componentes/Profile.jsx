import { useState } from 'react';
import fastShippingImg from '../img/fete.jpeg';
import { Direcciones } from './Direcciones';
import { ListaUsuarios } from './ListaUsuarios';
import { Link } from 'react-router-dom';

export const Profile = ({ paquetes, Login, UsuariosExis }) => {

    const paquetesArray = Array.isArray(paquetes.data) ? paquetes.data : [];
    // Calculate the total number of packages
    // const totalPaquetes = paquetes.length;
    const [data, setData] = useState(Login.user[0])
    // Corrige el nombre de la propiedad según tu estructura de datos
    const totalPaquet = paquetesArray.filter(u => u.usuario === Login.user[0].usuario);
    const totalPaquetes = totalPaquet.length;
    const cuentaAdmin = paquetesArray.length





    return (

        <div className="d-flex align-items-center shadow-lg justify-content-center container rounded flex-column bg-white margenb ">
            <div className=" d-flex align-items-center  justify-content-center  ">
                <img className=" img-fluid  " src={fastShippingImg} width={120} height={120} alt="Foto de perfil" />
            </div>
            <table className="table margen">
                <thead>
                    <tr>
                        <th scope="col">Usuario</th>
                        <th scope="col">Nombre</th>
                        <th scope="col"><Link to="paquetes">{Login.user[0].usuario === 'admin' ? 'Paquetes Registrados' : 'Paquetes Recibidos'}<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam" viewBox="0 0 16 16">
                            <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z" />
                        </svg></Link></th>
                        <th scope="col">{Login.user[0].usuario === 'admin' ? 'Usuarios Registrados' : 'Plan'}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">{data.usuario}</th>
                        <td>{data.nombre}</td>
                        {Login.user[0].usuario === 'admin' ? (
                            <>

                                <td>{cuentaAdmin}</td>
                                <td>{UsuariosExis.length}</td>

                            </>

                        ) : (
                            <>

                                <td>{totalPaquetes}</td>
                                <td>{data.plan}</td>

                            </>

                        )}

                    </tr>
                    {/* Button should be placed outside of the table */}
                </tbody>
            </table>
            {Login.user[0].usuario === 'admin' ? (
                <ListaUsuarios UsuariosExis={UsuariosExis} />

            ) :
                (
                    <Direcciones Login={Login} />)}


        </div>


    );
}
