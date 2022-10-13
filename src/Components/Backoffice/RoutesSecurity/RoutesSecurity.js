import { Get } from '../../../Services/privateApiService';

const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_AUTH

const isAdmin = (role_id) => {
    if(role_id === 1) {return true;} else {return false;}
}

const setIsAdmin = async () => {
    try {
        //utilizo la funcion de privateService que va a hacer la llamada al endpoint auth/me 
        //La funcion get se encarga de obtener el token y enviarlo por el header, por eso no se especifica acá
        const res = await Get(endpoint);
        if(res.data.success === true) {
            //isAdmin recibe el numero de rol del en base al token del usuario. Si el nro no es 1, devuelve.
            if (isAdmin(res.data.data.user.role_id)){
                localStorage.setItem('isAdmin', true);
                return true;
            } else {
                localStorage.setItem('isAdmin', false);
                return false;
            }
        } else {
            localStorage.setItem('isAdmin', false);
            return false;
        }
    } catch (err) {
        return err;
    }
}

const getIsAdmin = async () => {
    let token = localStorage.getItem('isAdmin');
    if (token == null || token == undefined) {
        await setIsAdmin();
        token = await localStorage.getItem('isAdmin');
    }
    return token;
}

export { setIsAdmin, getIsAdmin };