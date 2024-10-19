import axios from "axios";


const api = 'https://fastshippingback-t6ub.onrender.com/paquetes';
const apiAltern = 'https://fastshippingback-t6ub.onrender.com/paquetes/alternative';


export const findAllPaquetes = async () => {
    try {
        const response = await axios.get(api); // 10 segundos
        return response.data;
    } catch (error) {
        handleError(error)
    }
    return undefined;
}



export const registerAllPaquetes = async ({ usuario, tracking, peso, precio, status, pago, telefono, nombre, tarifas }) => {

    try {
        const posteo = await axios.post(api, { usuario, tracking, peso, precio, status, pago, telefono, nombre, tarifas })
        return posteo.data;

    } catch (error) {
        handleError(error)
    }
    return undefined;

}
export const sendMessage = async ({ usuario, tracking, peso, precio, status, pago, telefono, nombre, tarifas }) => {

    try {
        const posteo = await axios.post(apiAltern, {  tracking, precio, telefono, nombre })
        return posteo.data;

    } catch (error) {
        handleError(error)
    }
    return undefined;

}


export const updatePaquetes = async ({ id, status, pago, }) => {

    try {

        const actualiza = await axios.put(`${api}/${id}`, { status, pago });

        return actualiza.data;

    } catch (error) {

        handleError(error)
    }

    return undefined;

}

export const deletePaquetes = async ({id}) => {

    try {

        const actualiza = await axios.delete(`${api}/${id}`);

        return actualiza.data;

    } catch (error) {

        handleError(error)
    }

    return undefined;

}




const handleError = (error) => {
    if (axios.isAxiosError(error)) {
        // Manejo específico para errores de Axios
        if (error.response) {
            // La solicitud fue hecha y el servidor respondió con un código de estado
            // que está fuera del rango de 2xx
            console.error(`Error de respuesta (${error.response.status}):`, error.response.data);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error('Error de solicitud:', error.request);
        } else {
            // Algo ocurrió al configurar la solicitud
            console.error('Error de configuración:', error.message);
        }
    } else {
        // Errores no relacionados con Axios
        console.error('Error desconocido:', error);
    }
};
