import { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import Alert from '../../Alerts/Alerts';
import './OrganizationForm.css';
import '../../../general-styles.css';
import { validateImageFormat } from '../../../Services/validatorsService'

const OrganizationForm = () => {
    const [initialValues, setInitialValues] = useState({
        name: '',
        shortDescription: '',
        longDescription: '',
        facebookUrl: '',
        twitterUrl: '',
        instagramUrl: '',
        linkedinUrl: '',
        logo: ''
    })
    const [errors, setErrors] = useState({})
  
    const handleChange = (e) => {
        setInitialValues({...initialValues, [e.target.name]: e.target.value})
    }
    //chequeo si los campos estan completos o son vacios
    const isBlank = () => {
        let keys = Object.keys(initialValues);
        //en el for hago keys.lenght-1 para evitar verificar el campo logo en este lugar
        for (let i = 0; i < keys.length-1; i++) {
            let str = initialValues[keys[i]];
            if (!str || /^\s*$/.test(str)) {
                setErrors({[keys[i]]: 'El campo ' + keys[i] + ' no puede estar vacio'})
                Alert('Error','Error: el campo ' + keys[i] + ' no puede estar vacio', 'error')
                return true;
            } else {
                break;
            }
        }     
    }
    
    //chequeo que la url sea valida
    const isUrl = (str, campo) => {
        let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        if(!pattern.test(str)) {
            setErrors({[str]: 'El campo ' + str + ' no puede estar vacio'});
            Alert('Error','Error: la url de ' + campo + ' no es valida', 'error')
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isBlank()) {
            return;
        }
        if (!isUrl(initialValues.facebookUrl, 'facebook') ||
            !isUrl(initialValues.twitterUrl, 'twitter') ||
            !isUrl(initialValues.instagramUrl, 'instagram') ||
            !isUrl(initialValues.linkedinUrl, 'linkedin')) {
                return;
        }
          if(!validateImageFormat(initialValues.logo)) {
            setErrors({'logo': 'El fomato del logo no es valido. Solo se aceptan jpg y png'});
            Alert('Error','El fomato del logo no es valido. Solo se aceptan jpg y png','error')
            return;
        }
        Alert('Exito', 'Organizacion creada con exito', 'success');
    }

    return (
        <div className="main">
        <form className="organization-form-container" onSubmit={handleSubmit}>
            <input className="form-input" type="text" name='name' onChange={handleChange} placeholder="Nombre"></input>
            <input className="form-input" type="text" name='shortDescription' onChange={handleChange} placeholder="Breve descripcion" ></input>
            <input className="form-input" type="text" name='longDescription' onChange={handleChange} placeholder="Descripcion larga" ></input>
            <input className="form-input" type="text" name='facebookUrl'onChange={handleChange} placeholder="Link a Facebook" ></input>
            <input className="form-input" type="text" name='twitterUrl' onChange={handleChange} placeholder="Link a Twitter" ></input>
            <input className="form-input" type="text" name='instagramUrl' onChange={handleChange} placeholder="Link a Instagram" ></input>
            <input className="form-input" type="text" name='linkedinUrl' onChange={handleChange} placeholder="Link a LinkedIn" ></input>
            <input className="file-input form-input" type="file" id='img1' accept="image/png, image/jpeg" alt='new logo' src="logo.jpg" name='logo' placeholder="Logo" onChange={handleChange}></input>
            <button type="submit" className="form-button create-backoffice-button">Enviar</button>
        </form>
        </div>
    )
}

export default OrganizationForm;