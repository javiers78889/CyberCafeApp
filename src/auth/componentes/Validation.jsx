import { useEffect, useReducer, useState } from "react";
import { NavBar } from "../../componentes/NavBar";
import { UserRouter } from "../../routers/UserRouter";
import { LoginReducer } from "../../auth/reducer/LoginReducer";

import { Login } from "./Login";
import { Navigate, Route, Routes } from "react-router-dom";
import { Nav } from "./Nav";
import { findAllUsers,  } from "../services/Users";
import Swal from 'sweetalert2';



const initialLog = JSON.parse(sessionStorage.getItem("log")) || {
    'isAuth': false,
    "nombre": undefined,
    'password': undefined,
    'usuario': undefined,
};

export const Validation = () => {
    const [loginState, dispatch] = useReducer(LoginReducer, initialLog);

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
        const contra= valor.password;
        
        
        const VerificaUser = UsuariosExis.filter(u => u.usuario === Saludo);
        const VerificaSome = UsuariosExis.some(u => u.usuario === Saludo && u.contraseña === contra);
        

        if (VerificaSome) {

            dispatch({
                type: 'login',
                payload: VerificaUser,
            });

            Swal.fire({
                icon: 'success',
                title: `Bienvenido Señor ${VerificaUser[0].nombre} `,
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

    return (
        <>
            {loginState.isAuth ? (
                <NavBar Login={loginState} logout={logout} />
            ) : (
                <Nav />
            )}

            <Routes>
                {loginState.isAuth ? (
                    <Route path="/*" element={<UserRouter Login={loginState} />} />
                ) : (
                    <>
                        <Route path="/login" element={<Login Logueo={logueo} />} />
                        <Route path="/*" element={<Navigate to="/login" />} />
                    </>
                )}
            </Routes>
        </>
    );
};
