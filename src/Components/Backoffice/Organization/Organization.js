/*
Al ingresar a la ruta /backoffice/organization se mostrarán los datos actuales de la Organización 
(name, image, shortDescription), y la acción para acceder al formulario de edición (/backoffice/organization/edit)*/
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Get } from '../../../Services/privateApiService';
import './Organization.css';
import '../../../general-styles.css';

const Organization = () => { 
    const endpoint = process.env.REACT_APP_BASE_URL + process.env.REACT_APP_ORGANIZATION;
    const [information, setInformation] = useState({});

    const getData = async () => {
        try {
            let res = await Get(endpoint);
            setInformation(res.data.data)
        } catch (err) {
            return err;
        }
    }

    useEffect(() => {
        getData()
    } , []);

    return (
        <>
            <div className='organization-container' >
                <div className='organization-container__div'>
                    <img className='organization-container__div-img' src={information.logo} alt='imagen ong'/>
                    <h1 className='title'>{information.name}</h1>
                </div>
                <div className='organization-container__p' dangerouslySetInnerHTML={{__html: information.short_description}} />
                <Link to={"/backoffice/organization/edit"}>
                    <button className='primary-backoffice-button organization-container__button'>
                        Editar
                    </button>
                </Link>
            </div>  
            
        </>    
    )
}

export default Organization;