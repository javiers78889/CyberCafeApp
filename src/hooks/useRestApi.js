import { useEffect, useReducer, useState } from "react";
import { findAllUsers, registerAllUsers } from "../auth/services/Users";
import { PaqueteReducer } from "../Reducer/PaqueteReducer";
import { deletePaquetes, findAllPaquetes, registerAllPaquetes, updatePaquetes } from "../services/Paquete";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { validarPago } from "../payment/validarPago";
import { handlePayment } from "../payment/pago";

export const useRestApi = () => {
    const [paquetes, dispatch] = useReducer(PaqueteReducer, []);
    const [isLoading, setIsLoading] = useState(true);
    const [usuarios, setUsuarios] = useState([])
    const navigate = useNavigate();

    const fetchPaquetes = async () => {
        try {
            const result = await findAllPaquetes();
            dispatch({
                type: 'LoadingProduct',
                payload: result,
            });
        } catch (error) {
            console.error("Error al cargar los paquetes:", error);
            Swal.fire({
                title: "Error",
                text: "No se pudieron cargar los paquetes.",
                icon: "error"
            });
        }
        setIsLoading(false);
    };
    const fetchUsuarios = async () => {
        try {
            const result = await findAllUsers();
            setUsuarios(result)
        } catch (error) {
            console.error("Error al cargar los Usuarios:", error);
        }

    };

    useEffect(() => {
        fetchPaquetes();
        fetchUsuarios();
    }, []);

    const addPaquetes = async (obj) => {




        const usuarie = await findAllUsers();
        let precio = 0
        let tarifas = 0
        const { usuario } = obj;
        const filtro = usuarie.filter(u => u.usuario === usuario);
        if (filtro.length === 0) {
            Swal.fire({
                title: "Usuario no encontrado",
                text: "El usuario no se encontró.",
                icon: "error"
            });
            return;
        }
        if (filtro[0].plan === 'Plan Aereo') {
            tarifas = 3.25
            precio = (obj.peso * tarifas).toFixed(2);

        } else if (filtro[0].plan === 'Plan Maritimo') {
            tarifas = 3.25;
            precio = (obj.peso * tarifas).toFixed(2);

        }
        const telefono = filtro[0].telefono;
        const nombre = filtro[0].nombre;
        const nuevoPaquete = { ...obj, precio, telefono, nombre, tarifas };

        await registerAllPaquetes(nuevoPaquete);

        Swal.fire({
            title: "Paquete Registrado!",
            text: "Presione Ok para continuar!",
            icon: "success"
        });

        // Refresca la lista de paquetes después de agregar uno nuevo
        fetchPaquetes();

        navigate('profile/paquetes');
    };
    const addUsers = async (obj) => {
        const nuevoUsuario = { ...obj }; // Asegúrate de que el objeto sea un usuario
        const { usuario, telefono, correo } = nuevoUsuario
        const usuarios = await findAllUsers();

        const verifica = usuarios.filter(u => u.usuario === usuario || u.telefono === telefono || u.correo === correo)



        if (verifica.length > 0) {
            Swal.fire({
                title: "Este Usuario, Telefono , o Correo Ya Existe!",
                text: "Presione Ok para continuar!",
                icon: "error"
            });

        }
        else {

            Swal.fire({
                title: "Usuario Creado!",
                text: "Presione Ok para continuar!",
                icon: "success"
            });
            navigate('profile/paquetes');
            const posteo = await registerAllUsers(nuevoUsuario);
            findAllUsers()
        }


    };

    const Entregar = async (productId) => {
        const paqu = Array.isArray(paquetes.data) ? paquetes.data : [];
        const filtrado = paqu.find(pack => pack.id === productId);

        if (!filtrado) {
            console.error("No se encontró el paquete con el id:", productId);
            return;
        }

        console.log(filtrado); // Asegúrate de que esto sea un objeto válido

        const status = 'Entregado ✅';
        const pago = 'Pagado ✅';

        const { id } = filtrado;

        try {
            const actualizar = await updatePaquetes({ id, pago, status });
            Swal.fire({
                title: "Paquete Entregado!",
                text: "Presione 'OK', Para Continuar",
                icon: "success"
            });

            dispatch({
                type: 'DeliveredProduct',
                payload: actualizar
            });
        } catch (error) {
            console.error("Error al entregar el paquete:", error);
        }
        // Refresca la lista de paquetes después de agregar uno nuevo
        fetchPaquetes();
        navigate('profile/paquetes');
    };


    const pagarPaquete = async (pagos) => {
        // Accede a la propiedad correcta del objeto JSON
        const paqu = Array.isArray(paquetes.data) ? paquetes.data : [];
        const filtraPago = paqu.find(pack => pack.id === pagos);
        const pago = 'Pagado ✅';
        //PAGO


        const pagando = handlePayment(filtraPago.precio, filtraPago.tracking, filtraPago.id); // Llama a la función para manejar el pago
        console.log(pagando.data)

        if (pagando) {

            validarPago()
        }
    };

    const eliminarPaquete = async (id) => {

        Swal.fire({
            title: `¿Seguro que desea eliminar el paquete N° ${id}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Si",
            denyButtonText: `No`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const eliminar = await deletePaquetes({ id })
                if (eliminar) {
                    Swal.fire("Listo!", "", "Paquete Eliminado");
                    fetchPaquetes();
                }


            } else if (result.isDenied) {

            }
        });



    }

    return {

        paquetes,
        isLoading,
        addPaquetes,
        addUsers,
        Entregar,
        pagarPaquete,
        usuarios,
        eliminarPaquete


    }

}