// React
import { useState } from "react";
import { Link } from "react-router-dom";
// Components
import FormInput from './FormInput';
import Alert from '../../Alerts/Alerts'
// CSS
import '../../../general-styles.css'
import './SignUp.css';
// Resources
import signUpImg from '../Login/imagenONG.jpeg'
// Services
import { Post } from '../../../Services/publicApiService'
// Términos y condiciones
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

//redireccion y token
import { Redirect } from "react-router-dom";
import getToken from '../../../Services/getToken';

const SignUp = () => {

    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [check, setCheck] = useState(false)

    const inputs = [
        {
            name: "username",
            type: "text",
            placeholder: "Nombre",
            pattern: `^[A-Za-z]{3,16}$`,
            errorMessage: "El nombre debe ser más largo"
        },
        {
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "Email inválido"
        },
        {
            name: "password",
            type: "password",
            placeholder: "Contraseña",
            pattern: `^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$`,
            errorMessage: `Contraseña obligatoria debe tener una longitud mínima de 6 caracteres,
                           y contener al menos un número, una letra y un símbolo (por ejemplo: @#$%)`
        },
        {
            name: "confirmPassword",
            type: "password",
            placeholder: "Repite la contraseña",
            pattern: values.password,
            errorMessage: "Las contraseña no coinciden"
        }
    ];

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    //get del token para redireccionamiento si el usarios esta autenticado
    const token = getToken();
    if(token) return <Redirect to='/'/>

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const registerUser = {
            name: values.username.toString(),
            email: values.email.toString(),
            password: values.password.toString()
        }

        if(check){
            Post(process.env.REACT_APP_BASE_URL + '/register', registerUser);
            Alert('Exito', 'Usuario registrado con exito', 'success');
        } else {
            Alert('Error', 'Debe aceptar los términos y condiciones', 'warning')
        }
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const checkTheBox = () => {
        setCheck(!check)
    }

    const previousPage = () => {
        if(pageNumber > 1) {
            setPageNumber(pageNumber - 1)
        }
    }

    const nextPage = () => {
        if(pageNumber < numPages) {
            setPageNumber(pageNumber + 1)
        }
    }

    return (
        <>
            <div className="form-container-signup">
                <img className="logo-signup" src='./logo.svg' alt="logo-ONG" />
                <span><input type="checkbox" onClick={checkTheBox}/>He leído y acepto 
                    <Popup trigger={<a className='tyc-link'> los términos y condiciones</a>} position="top center">
                        <div><ArrowBackIosIcon onClick={previousPage} className='page-button'></ArrowBackIosIcon><ArrowForwardIosIcon onClick={nextPage} className='page-button'></ArrowForwardIosIcon></div>
                        <p>
                            Page {pageNumber} of {numPages}
                        </p>
                        <Document file="tyc.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </Popup>
                    </span>
                <form onSubmit={handleSubmit}>
                    {inputs.map((input, index) => (
                        <FormInput
                            key={index}
                            {...input}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    ))}

                    <button className="primary-button" type="submit">Registrate</button>

                    <span className="have-account-text">Ya tienes cuenta?
                        <Link to="/login" className="link-to-login">Ingresa!</Link>
                    </span>
                </form>
            </div >
            <img className="container-hands-img" src={signUpImg} alt="signup-img" />
        </>
    );
};


export default SignUp;