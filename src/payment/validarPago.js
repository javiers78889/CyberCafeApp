export const validarPago = async () => {

    if (filtraPago) {
        const { status, id, precio, tracking } = filtraPago;
        const monto = precio;
        const descripcion = tracking;


        try {

            const actualizar = await updatePaquetes({ id, pago, status });


            dispatch({
                type: 'Pago',
                payload: actualizar,
            });

            Swal.fire({
                title: "Paquete Pagado Con Éxito!",
                text: "Presione 'OK', Para Continuar!",
                icon: "success"
            });

            // Verifica el valor actualizado de `isNewPaqueteAdded`
            console.log("isNewPaqueteAdded:", isNewPaqueteAdded);

        } catch (error) {
            console.error("Error al actualizar el estado de pago:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudo actualizar el estado de pago.",
                icon: "error"
            });
        }
    } else {
        console.log("Paquete no encontrado para el ID:", pagos);
    }
}