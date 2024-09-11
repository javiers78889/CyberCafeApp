import CryptoJS from 'crypto-js';
export const handlePayment = async (pago, tracking, id) => {
    // Define los parámetros de la solicitud

    const factura= `FS-${id}`
    const cclw = '772036B56D042E80648CBE6943A41ECF8C2C3C16D4E9641C545EFA93B6C959F295A48CCCF2E90946447B39F55D4CA96DE6B4A0A6B74B6B2FC0ECCC1D7570E967';
    const amount = pago; // Usa el monto de los pagos si es necesario
    const description = tracking; // Actualiza la descripción si es necesario
    const returnUrl = 'https://fastshippingags.onrender.com'; // URL de retorno
    const parm1 = id;

    // Convierte JSON a hexadecimal
    const json = JSON.stringify({ id: parm1, nameOrLabel: description, value: amount });
    const hex = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(json));

    // Construye los datos POST
    const data = new URLSearchParams({
        "CCLW": cclw,
        "CMTN": amount,
        "CDSC": factura,
        "RETURN_URL": encodeURIComponent(returnUrl),
        "PF_CF": hex,
        "PARM_1": parm1
    }).toString();

    try {
        // Realiza la solicitud POST
        const response = await fetch('https://secure.paguelofacil.com/LinkDeamon.cfm', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': '*/*'
            },
            body: data
        });

        // Procesa la respuesta
        const result = await response.json();
        if (result.headerStatus.code === 200) {
            // Redirige al usuario a la URL de Paguelofacil
            window.location.href = result.data.url;
        } else {
            console.error('Error en la respuesta:', result.headerStatus.description);
        }

    } catch (error) {
        console.error('Error en la solicitud:', error);
        return false
    }
    return true
};