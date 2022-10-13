import swAlert from 'sweetalert';

//type can be: error - warning - success
const Alert = (title, message, type) => {
    swAlert(title, message, type)
}

export default Alert;
