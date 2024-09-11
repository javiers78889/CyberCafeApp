import { useReducer } from "react";
import { PaqueteReducer } from "../Reducer/PaqueteReducer";
import { Paquete } from "../services/Paquete";
import { useNavigate } from "react-router-dom";

export const usePaquetes=()=>{
    const [paquetes, dispatch] = useReducer(PaqueteReducer, Paquete)
    const navigate=useNavigate();
    const addPaquetes = (obj) => {

        console.log(obj);
        const id = paquetes.length + 1;
        const precio=obj.peso*2.50;
        const nuevoPaquete = { ...obj, id ,precio};
        dispatch({
            type: 'addProduct',
            payload: nuevoPaquete,
        })
        navigate('profile/paquetes');
    };
    return {
        paquetes,
        addPaquetes
    };
}