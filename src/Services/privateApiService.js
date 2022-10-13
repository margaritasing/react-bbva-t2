import axios from "axios";
import getPrivateHeaderAuth from './getPrivateHeaderAuth';

const config = {
    headers: getPrivateHeaderAuth()
}

const Get = async (endpoint) => {
    
    if(!endpoint) throw new Error("Parameter 'endpoint' is not defined.")

    try {       
        const response = await axios.get(endpoint, config)
        return response
    } catch (error) {
        return error       
    }
};

const Delete = async (endpoint) => {

    if(!endpoint) throw new Error("Parameter 'endpoint' is not defined.")

    try {
        const response = await axios.delete(endpoint, config);
        return response
    } catch (error) {
        return error       
    }
}

const Post = async (endpoint, body) => {
    if (!endpoint) throw new Error("parameter 'endpoint' is not defined.");
    if (!body) throw new Error("parameter 'body' is not defined")

    if (getPrivateHeaderAuth) {
        try{
            const response =  await axios.post(endpoint, body, config)
            return response
        }catch(error){
            return error
        }
    }
}

const Put = async (endpoint, body) => {

    if (!endpoint) throw new Error("parameter 'endpoint' is not defined.");
    if (!body) throw new Error("parameter 'body' is not defined")

    if (getPrivateHeaderAuth) {
        try{
            const response =  await axios.put(endpoint, body, config)
            return response
        }catch(error){
            return error
        }
    }
}

export { Delete, Get, Post, Put }
