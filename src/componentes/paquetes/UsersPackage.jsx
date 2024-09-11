

export const UsersPackage = ({ pack = [], ValorLogueo, generatePDF, Login, pago }) => {
    return (
        <>


            
                 
                        <th scope="row">{pack.id}</th>
                        <td>{pack.tracking}</td>
                        <td>{pack.peso}</td>
                        <td>${pack.precio}</td>
                        <td>{pack.status}</td>
                        <td>{pack.fecha}</td>

                        {Login.user && Login.user.length > 0 && Login.user[0].usuario !== 'admin' ? (
                            pack.pago === "Pendiente ⬜" ? (
                                <td><button type="button" className="btn btn-warning" onClick={() => pago(pack.id)}>Pagar</button></td>
                            ) : (
                                <td><p>Pagado ✅</p></td>
                            )
                        ) : null}

                        <td><button type="button" className="btn btn-danger" onClick={() => generatePDF(pack.id)}>Ver Recibo</button></td>
                 
             




        </>


    )

}
