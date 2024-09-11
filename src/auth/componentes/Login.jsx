
import { useState } from 'react';
import fastShippingImg from '../../img/fete.jpeg';
import '../../estilos/app.css'
import Swal from 'sweetalert2';
const initalUserValid = {
    'usuario': '',
    'password': '',

}
export const Login = ({ Logueo }) => {
    const [UserValid, SetUserValid] = useState(initalUserValid);
    const { usuario, password } = UserValid;
    const [cargando, setCargando] = useState(false)

    const OnInputchangeLog = (event) => {
        const { name, value } = event.target;
        SetUserValid({ ...UserValid, [name]: value });

    }
    const submit = (event) => {
        event.preventDefault();
        const username = event.target.usuario.value.trim();
        const password = event.target.password.value.trim();
    
        setCargando(true)
        // Verificar si alguno de los campos está en blanco
        if (username === '' || password === '') {
            Swal.fire({
                icon: "error",
                title: "Introduzca Un Usuario y Password",
                text: "Introduzca sus Credenciales",
            });
            setCargando(false);
        }
        else{
            
            setTimeout(() => {
                
                Logueo(UserValid);
                setCargando(false);
            }, 3000)
        }
        
     
    }




    return (
        <div className='Logo'>

            <div className="form-container form-overlay w-60 d-flex align-items-center justify-content-center container centrar margenLog">
                <form className="w-50 shadow-lg  p-4 bg-white rounded my-5" onSubmit={submit}>
                    <div className="d-flex justify-content-center align-items-center mb-3">
                        <img className="img-fluid " src={fastShippingImg} width={100} height={100} alt="Foto de perfil" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Usuario</label>
                        <input type="text" className="form-control" name="usuario" placeholder='Usuario' value={usuario} onChange={OnInputchangeLog} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" placeholder='Contraseña' value={password} onChange={OnInputchangeLog} />
                    </div>
                    {cargando ? (
                        <div className="loading-container">
                            <div className="loader"></div>
                            <p>Loading...</p>
                        </div>
                    ) : (

                        <button type="submit" className="btn btn-danger form-control">Login</button>

                    )}
                </form>



            </div>

        </div>
    )
}