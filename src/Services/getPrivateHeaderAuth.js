import getToken from './getToken';

const getPrivateHeaderAuth = () => {
    //Devuelve un objeto header con la autorizacion si es que hay un token valido
    const token = getToken();

    return token ? {'Authorization': 'Bearer ' + token} : {error: "No token found"};
}

export default getPrivateHeaderAuth