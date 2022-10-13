import axios from 'axios';

const config = {
    headers: {
        Group: 2
    }
}


const Get = async (endpoint) => {
    if(!endpoint){
        throw new Error("Parameter 'endpoint' is not defined.")
    }
  
    try {
        const response = await axios.get(endpoint);
        return response; 
    } catch (error) {
        return error;
    }

}

const Post = async (endpoint, body) => {
    if(!endpoint){
        throw new Error("Parameter 'endpoint' is not defined.")
    }

    try {
        const response = await axios.post(endpoint, body, config)
        return response;
    } catch (error) {
        return error;
    }
}

export { Post, Get }
