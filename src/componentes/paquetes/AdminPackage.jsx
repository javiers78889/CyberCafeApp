

export const AdminPackage = ({ pack = [], generatePDF, Entregar, formatDate, eliminarPaquete }) => {
    const fechaFormateada = formatDate(pack.fecha);
    return (

        <>
            <th scope="row">{pack.id}</th>
            <td>{pack.tracking}</td>
            <td>{pack.peso}</td>
            <td>${pack.precio}</td>
            <td>{pack.status}</td>
            <td>{pack.pago}</td>
            <td>{fechaFormateada}</td>
            {pack.status === 'Pendiente ⬜' ? (

                <td><button type="button" className="btn btn-success " onClick={() => Entregar(pack.id)}>Entregar<svg className="ms-1 bi bi-send" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                </svg></button></td>


            ) : ''}
            <td><button type="button" className="btn btn-danger" onClick={() => generatePDF(pack.id)}>Ver Recibo</button></td>
            <td><button type="button" className="btn btn-danger" onClick={() => eliminarPaquete(pack.id)}><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
            </svg></button></td>
        </>


    )
}
