
import axios from "axios";


const api = 'https://fastshippingback-t6ub.onrender.com/users';

export const findAllUsers = async () => {
    try {
        const response = await axios.get(api)
        return response.data;

    } catch (error) {

        handleError(error)

    }

    return undefined;

}


export const registerAllUsers = async ({ usuario, contraseña, isAuth, nombre, plan, telefono}) => {


    try {
        const posteo = await axios.post(api, { usuario, contraseña, isAuth, nombre, plan, telefono })
        return posteo.data;

    } catch (error) {
        handleError(error)
    }
    return undefined;

}

export const UpdateUsers = async ({ usuario, contraseña }) => {
    try {
        const update = await axios.put(api, { usuario, contraseña })

        return update.data

    } catch (error) {
        handleError(error)

    }
}
export const UpdateAllUsers = async (body) => {
    const {
        id,
        usuario,
        contraseña,
        nombre,
        plan,
        telefono,

    } = body;

    const res = {
        usuario,
        contraseña,
        nombre,
        plan,
        telefono,
    }
    console.log(res)
    try {
        const update = await axios.patch(`${api}/${id}`, res)

        return update.data

    } catch (error) {
        handleError(error)

    }
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

