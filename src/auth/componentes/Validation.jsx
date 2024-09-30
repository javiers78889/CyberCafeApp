import { useEffect, useReducer, useState } from "react";
import { NavBar } from "../../componentes/NavBar";
import { UserRouter } from "../../routers/UserRouter";
import { LoginReducer } from "../../auth/reducer/LoginReducer";

import { Login } from "./Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Nav } from "./Nav";
import { findAllUsers, UpdateUsers, } from "../services/Users";
import Swal from 'sweetalert2';
import { Recovery } from "./Recovery";
import { useRestApi } from "../../hooks/useRestApi";
import { Rastreo } from "./Rastreo";



const initialLog = JSON.parse(sessionStorage.getItem("log")) || {
    'isAuth': false,
    "nombre": undefined,
    'password': undefined,
    'usuario': undefined,
};

export const Validation = () => {
    const { usuarios } = useRestApi()
    const [loginState, dispatch] = useReducer(LoginReducer, initialLog);
    const navigate = useNavigate();

    const [UsuariosExis, SetUsuarioExis] = useState(initialLog);
    
    useEffect(() => {
        const axiosData = async () => {
            const obUsers = await findAllUsers();
            if (obUsers) {
                SetUsuarioExis(obUsers)
            }
        }

        axiosData();
    }, [])



    useEffect(() => {
        sessionStorage.setItem("log", JSON.stringify(loginState));
    }, [loginState])



    const logueo = async (valor) => {

        const Saludo = valor.usuario;
        const contra = valor.password;


        const VerificaUser = UsuariosExis.filter(u => u.usuario === Saludo);
        const VerificaSome = UsuariosExis.some(u => u.usuario === Saludo && u.contraseña === contra);


        if (VerificaSome) {

            dispatch({
                type: 'login',
                payload: VerificaUser,
            });

            Swal.fire({
                icon: 'success',
                title: `Bienvenid@ ${VerificaUser[0].nombre} `,
                text: 'Un Gusto Verlo Por Aqui!',
            });



        }

        else {
            Swal.fire({
                icon: "error",
                title: "Introduzca Una Contraseña Valida",
                text: "Verifique Los Datos Ingresados",
            });
        }



    };
    const logout = () => {

        dispatch({
            type: 'logout',
        });


    };

    const UpdateUser = async (obj) => {
        const { usuario } = obj;

        // Buscar el usuario en la lista
        const verifica = usuarios.find(u => u.usuario === usuario);

        // Verificar si el usuario no existe
        if (!verifica) {
            Swal.fire({
                title: "Usuario No Encontrado!",
                text: "Presione Ok para continuar!",
                icon: "error"
            });
            return;
        }

        // Verificar si el usuario es "admin"
        if (verifica.usuario === "admin") {
            Swal.fire({
                title: "No se Puede Cambiar La Contraseña de Admin!",
                text: "Contacte A Soporte Tecnico!",
                icon: "error"
            });
            return;
        }

        // Si el usuario no es admin, proceder con la actualización
        try {
            const update = await UpdateUsers(obj);
            Swal.fire({
                title: "Datos Actualizados!",
                text: "Presione Ok para continuar!",
                icon: "success"
            });
            navigate('/');
        } catch (error) {
            Swal.fire({
                title: "Error al Actualizar Datos!",
                text: "Intente nuevamente más tarde!",
                icon: "error"
            });
        }
    }


    return (
        <>
            {loginState.isAuth ? (
                <NavBar Login={loginState} logout={logout} />
            ) : (
                <Nav />
            )}

            <Routes>
                {loginState.isAuth ? (
                    <Route path="/*" element={<UserRouter Login={loginState} UsuariosExis={UsuariosExis} />} />
                ) : (
                    <>
                        <Route path="/" element={<Login Logueo={logueo} />} />
                        <Route path="/Recovery" element={<Recovery UpdateUser={UpdateUser} />} />
                        <Route path="/Rastreo" element={<Rastreo />} />
                        <Route path="/*" element={<Navigate to="/" />} />
                    </>
                )}
            </Routes>
        </>
    );
};
